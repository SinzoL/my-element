<template>
  <form class="el-form">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide } from "vue";
import type { ValidateFieldsError } from "async-validator";
import { formProps, formContextKey } from "./types";
import type { FormItemContext, FormContext, FormValidateFailure } from "./types";

const props = defineProps(formProps);

defineOptions({
  name: "ElForm",
});

const fields: FormItemContext[] = [];

const addField: FormContext["addField"] = (field) => {
  fields.push(field);
};

const removeField: FormContext["removeField"] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1);
  }
};

const resetFields: FormContext["resetFields"] = () => {
  fields.forEach((field) => {
    field.resetField();
  });
};

const clearValidate: FormContext["clearValidate"] = (keys = []) => {
  const filterArr =
    keys.length > 0 ? fields.filter((field) => keys.includes(field.prop)) : fields;
  filterArr.forEach((field) => {
    field.clearValidate();
  });
};

const validate: FormContext["validate"] = async () => {
  let validationErrors: ValidateFieldsError = {};
  for (const field of fields) {
    try {
      await field.validate("");
    } catch (err) {
      const error = err as FormValidateFailure;
      validationErrors = {
        ...validationErrors,
        ...error.fields,
      };
    }
  }
  //验证通过
  if (Object.keys(validationErrors).length === 0) return true;
  return Promise.reject(validationErrors);
};

defineExpose({
  validate,
  resetFields,
  clearValidate,
});

provide(formContextKey, {
  ...props,
  addField,
  removeField,
  resetFields,
  clearValidate,
  validate,
});
</script>
