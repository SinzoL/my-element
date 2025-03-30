<template>
    <button 
    class="el-button" 
    ref="_ref" 
    :disabled="disabled || loading" 
    :autofocus="autofocus" 
    :class="computedClass"
    :type="nativeType"
    >
            <el-icon icon="spinner" v-if="loading" spin/>
            <el-icon :icon="icon" v-if="icon"/>
        <span>
            <slot>Button</slot>
        </span>
    </button>
</template>

<script setup lang="ts">
import { buttonProps } from './types'
import { ref, computed } from 'vue'
import ElIcon from '../Icon/Icon.vue'

defineOptions({
    name: 'ElButton'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
    ref: _ref
})


const props = defineProps(buttonProps)

// 计算button的样式类
const computedClass = computed(()=>{
  const { type, size, round, loading, circle, disabled, plain } = props
  return [
    type ? 'el-button--' + type : '',
    size ? 'el-button--' + size : '',
    { 
      'is-round': round,
      'is-loading': loading,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-plain': plain,
    }
  ]
});
</script>