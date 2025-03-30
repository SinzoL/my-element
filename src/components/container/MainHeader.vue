<template>
    <header class="el-header" :style="computedStyle">
        <slot> Header </slot>
    </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type {HeightProps} from './types'

defineOptions({
    name: 'ElHeader'
})
const props = defineProps<HeightProps>()
const computedStyle = computed(() => {
    return {
        height: (props.height || 60) + 'px'
    }
})
</script>