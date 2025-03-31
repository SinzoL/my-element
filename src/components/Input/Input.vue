<template>
  <div class="el-input" :class="computedClass">
    <label v-if="label" class="el-input-label">
      {{ label }}
    </label>

    <div v-if="$slots.prepend" class="el-input-prepend">
      <slot name="prepend" />
    </div>
    <div class="el-input-container">
      <span v-if="$slots.prefix" class="el-input-prefix">
        <slot name="prefix" />
      </span>
      <input
        ref="inputInstance"
        v-model="inputValue"
        class="el-input-content"
        :type="inputType"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :form="form"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-show="isEyeShow" @click="changeInputType" class="el-input-eye">
        <el-icon :icon="eyeIcon" />
      </span>

      <span v-if="showSuffixIcon" class="el-input-suffix">
        <slot name="suffix" />
      </span>
    </div>
    <div v-if="$slots.append" class="el-input-append">
      <slot name="append" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { InputProps, InputEmits } from "./types";
import { ref, computed, useSlots, watch, inject } from "vue";
import type { Ref } from "vue";
import ElIcon from "../Icon/Icon.vue";
import { formItemContextKey } from "./types";

const isFocus = ref(false);
const slots = useSlots();

const props = withDefaults(defineProps<InputProps>(), {
  type: "input",
  size: "default",
  modelValue: "",
  placeholder: "Please input", //灰色字符
});

const emits = defineEmits<InputEmits>();

const computedClass = computed(() => {
  return {
    [`el-input-${props.size}`]: props.size,
    [`el-input-${props.type}`]: props.type,
    "is-disabled": props.disabled,
    "is-focus": isFocus.value,
  };
});

const inputValue = ref(props.modelValue);
const formItemContext = inject(formItemContextKey, {});
const runValidation = (trigger: string) => {
  if (props.validateEvent) {
    formItemContext?.validate?.(trigger).catch((err: unknown) => console.error(err));
  }
};

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  inputValue.value = (target as HTMLInputElement).value;
  emits("update:modelValue", target.value);
  emits("input", target.value);
  runValidation("input");
};

const handleChange = () => {
  emits("change", inputValue.value);
  runValidation("change");
};

const handleFocus = (e: Event) => {
  isFocus.value = true;
  emits("focus", e);
};

//输入框失去焦点时触发
const handleBlur = (e: FocusEvent) => {
  console.log(`blur triggered`);
  isFocus.value = false;
  emits("blur", e);
  runValidation("blur");
};

watch(
  () => props.modelValue,
  (newValue: string) => {
    inputValue.value = newValue;
  }
);

//是否显示清除图标，基于是否有输入
const clearable = computed(() => {
  return inputValue.value.length > 0;
});

const showSuffixIcon = computed(() => {
  return slots.suffix && !props.showClear && !props.showPassword;
});

const inputType = ref(props.type);
watch(
  () => props.type,
  (newType) => {
    inputType.value = newType;
  }
);
const isEyeShow = computed(() => {
  return props.showPassword && !props.showClear && clearable.value;
});

const eyeIcon = ref("eye");

const changeInputType = () => {
  if (inputType.value === "password") {
    eyeIcon.value = "eye-slash";
    inputType.value = "text";
  } else {
    inputType.value = "password";
    eyeIcon.value = "eye";
  }
};

const inputInstance = ref() as Ref<HTMLInputElement>;

defineExpose({
  inputInstance,
});

defineOptions({
  name: "ElInput",
});
</script>

<style scoped></style>
