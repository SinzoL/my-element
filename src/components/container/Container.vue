<template>
    <section
    :class="computedClass">
        <slot> Container </slot>
    </section>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import type {Component, VNode} from 'vue'

defineOptions({
    name: 'ElContainer'
})

interface ContainerProps {
    direction?: 'horizontal' | 'vertical'
}

const slots = useSlots()

const props = withDefaults(defineProps<ContainerProps>(), {
  direction: 'horizontal' // 设置默认值
});

const isVertical = computed(() => {
    //优先级一
    if(props.direction === 'vertical') {
        return true
    }else if(props.direction === 'horizontal') {
        return false
    }

    //优先级二
    if(slots?.default) {
        //遍历vNode节点数组，如果存在el-header、el-footer、el-aside、el-main，返回true
        const vNodes: VNode[] = slots.default()
        return vNodes.some(vNode => {
            const tag = (vNode.type as Component).name
            return tag === 'ElHeader' || tag === 'ElFooter'
        })
    }else {
        return false
    }
})

const computedClass = computed(() => {
    return {
        'el-container': true,
        'el-container-horizontal': !isVertical.value,
        'el-container-vertical': isVertical.value
    }   
})
</script>