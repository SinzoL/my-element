<template>
  <div
    classv="el-form-item"
    ref="formItemRef"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loadding': validateStatus.loading,
      'is-requireed': isRequired,
    }"
  >
    <div class="el-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </div>
    <div class="el-form-item__content">
      <slot :validate="validate" />
      <div
        class="el-form-item__error-msg"
        v-if="validateStatus.state === 'error' && props.showMessage"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive, ref, computed, onMounted, onUnmounted, provide } from "vue";
import AsyncValidator from "async-validator";
import type { RuleItem } from "async-validator";
import { isNil } from "lodash-es";
import { formItemProps, formContextKey, formItemContextKey } from "./types";
import type { FormItemContext, FormValidateFailure } from "./types";

//定义props
const props = defineProps(formItemProps);

//设置组件选项
defineOptions({
  name: "ElFormItem",
});

//获取表单上下文
const formContext = inject(formContextKey);

//定义验证状态
const validateStatus = reactive({
  state: "init",
  errorMsg: "",
  loading: false,
});

//表单项的引用
const formItemRef = ref<HTMLDivElement>();

const getItemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop];
  } else {
    return [];
  }
});

//是否为必填项的计算属性
const isRequired = computed(() => {
  return getItemRules.value?.some((rule) => rule.required);
});

const getTriggeredRules = (trigger?: string) => {
  const itemRules = getItemRules.value;
  if (itemRules) {
    return itemRules
      .filter((rule) => {
        if (!rule.trigger || !trigger) return true;
        return rule.trigger === trigger;
      })
      .map(({ ...rule }) => rule as RuleItem); // 明确忽略 trigger
  }
  return [];
};

//初始值
type initialValueType = string | number | boolean | object | undefined | null;
let initialValue: initialValueType = undefined;

//计算属性
const innerValue = computed(() => {
  //获取表单模型
  const model = formContext?.model;

  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop] as initialValueType;
  } else {
    return null as initialValueType;
  }
});

const validate = async (trigger?: string): Promise<boolean> => {
  const modelName = props.prop;
  const triggeredRules = getTriggeredRules(trigger);
  try {
    if (triggeredRules.length === 0) {
      return true;
    }
    if (modelName) {
      const validator = new AsyncValidator({
        [modelName]: triggeredRules,
      });
      validateStatus.loading = true;
      return validator
        .validate({ [modelName]: innerValue.value })
        .then(() => {
          validateStatus.state = "success";
          return true;
        })
        .catch((e: FormValidateFailure) => {
          const { errors } = e;
          validateStatus.state = "error";
          validateStatus.errorMsg = errors?.[0].message || "";
          return false;
        })
        .finally(() => {
          validateStatus.loading = false;
        });
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

//清除验证状态的函数
const clearValidate = () => {
  validateStatus.state = "init";
  validateStatus.errorMsg = "";
  validateStatus.loading = false;
};

//重置字段的函数
const resetField = () => {
  const model = formContext?.model;
  clearValidate();
  if (model && props.prop && model[props.prop]) {
    model[props.prop] = initialValue;
  }
};

//表单项上下文
const context: FormItemContext = reactive({
  $el: formItemRef,
  prop: props.prop || "",
  validate,
  resetField,
  clearValidate,
});

//提供表单项的上下文
provide(formItemContextKey, context);

//组件挂载时执行的钩子函数
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
    initialValue = innerValue.value;
  }
});

//组件卸载时执行的钩子函数
onUnmounted(() => {
  formContext?.removeField(context);
});

defineExpose({
  //
  validateStatus,
  validate,
  clearValidate,
  resetField,
});
</script>
