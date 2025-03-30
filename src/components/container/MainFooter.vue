<template>
    <footer class="el-footer" :style="computedStyle">
        <slot> footer </slot>
    </footer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type {HeightProps} from './types'

defineOptions({
    name: 'ElFooter'
})
const props = defineProps<HeightProps>()
const computedStyle = computed(() => {
    return {
        height: (props.height || 60) + 'px'
    }
})
</script>