<template>
    <button class="el-button" ref="_ref" 
    :disabled="disabled || loading" 
    :autofocus="autofocus" 
    :type="nativeType"
        :class="[
            type ? 'el-button--' + type : '',
            size ? 'el-button--' + size : '',
            {
                'is-disabled': disabled,
                'is-loading': loading,
                'is-plain': plain,
                'is-round': round,
                'is-circle': circle
            }]">
            <el-icon icon="spinner" v-if="loading" spin/>
            <el-icon :icon="icon" v-if="icon"/>
        <span>
            <slot>Button</slot>
        </span>
    </button>
</template>

<script setup lang="ts">
import { buttonProps } from './types'
import { ref } from 'vue'
import ElIcon from '../Icon/Icon.vue'

defineOptions({
    name: 'ElButton'
})

const _ref = ref<HTMLButtonElement>()

defineExpose({
    ref: _ref
})


defineProps(buttonProps)
</script>