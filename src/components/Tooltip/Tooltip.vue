<template>
    <div
        class="el-tooltip"
        ref="popperContainerNode"
        v-on="outerEvents">
        <!-- 触发显示的内容-->
        <div 
            class="el-tooltip__trigger"
            ref="triggerNode"
            v-on="events">
            <slot/>
        </div>

        <!-- 内容 -->>
        <Transition :name="tran">
            <div 
                class="el-tooltip__popper" 
                v-show="isOpen"
                ref="popperNode"
                v-on="dropdownEvents"
                >
                <div class="content">
                    <slot name="content">
                        {{ content }}
                    </slot>
                </div>
                <div id="arrow" data-popper-arrow>  </div>
            </div>
        </Transition>
    </div>
</template>



<script setup lang="ts">
import { ref, watch, computed,reactive } from "vue";
import { TooltipEmits, TooltipInstance, TooltipProps } from "./types";
import { debounce } from "lodash-es";
import useClickOutside from "../../hooks/useClickOutside";
import { createPopper } from "@popperjs/core";
import { onUnmounted } from "vue";
import type { Instance } from "@popperjs/core";

defineOptions({
    name: 'ElTooltip'
})

const props = withDefaults(
    defineProps<TooltipProps>(),
    {
        placement: 'bottom',
        trigger: 'hover',
        openDelay: 0,
        closeDelay: 0,
        tran: 'hover',
    }
);

//定义组件的事务触发器 emits
const emits = defineEmits<TooltipEmits>();

//创建ref对象来存储组件的状态和元素引用
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()

let popperInstance: null | Instance = null
let events: Record<string, unknown> = reactive({})
let outerEvents: Record<string, unknown> = reactive({})
let dropdownEvents: Record<string, unknown> = reactive({})

//计算关闭的延迟时间
const closeDelay = computed(() => 
    props.trigger === 'hover' && props.closeDelay === 0
    ? 50: props.closeDelay
)


//通过computed生成弹出层定位配置，既有默认策略也给用户自定义自由
const popperOptions = computed(() => {
    return {
        placements: props.placement,
        modifiers: [
            {
                name: 'offfset',
                options: {
                    offset: [0, 8]
                }
            }
        ],
        ...props.popperOptions
    }
})


//初始化打开和关闭的次数
let closeTimes = 0
let openTimes = 0


//定义打开和关闭的函数
const open = () => {
    openTimes++
    isOpen.value = true
    emits('visible-change', true)
}

const close = () => {
    closeTimes++
    isOpen.value = false
    emits('visible-change', false)
}


//使用lodash中的debounce函数创建打开和关闭的防抖函数
const openDebounced = debounce(open, props.openDelay )
//***
//需要注意上面在组件初始化就获得值，是一个普通值，非响应式的
const closeDebounced = debounce(close, closeDelay.value)
//而这里的closeDelay是一个计算属性，是一个响应式的

//最终打开和关闭函数，用于取消之前的防抖操作并调用新的防抖函数
const openFinal = () => {
    closeDebounced.cancel()
    openDebounced()
}

const closeFinal = () => {
    openDebounced.cancel()
    closeDebounced()
}

//切换tooltip的显示状态
const togglePopper = () => {
    if(isOpen.value) {
        closeFinal()
    } else{
        openFinal()
    }
}

//监听点击组件外部的事件，关闭tooltip
useClickOutside(popperContainerNode, () => {
    if(props.trigger === 'click' && isOpen.value && !props.manual) {    
        closeFinal()
    }
    if(isOpen.value) {
        emits('click-outside', true)
    }
})

//根据触发方式和手动控制属性来绑定事件
const attachEvents = () => {
    if(props.trigger === 'hover') {
        events['mouseenter'] =  openFinal
        outerEvents['mouseleave'] = closeFinal
        dropdownEvents['mouseleave'] = openFinal
    } else if(props.trigger === 'click') {
        events['click'] = togglePopper
    }
}

//如果非手动控制，则绑定事件
if (!props.manual) {
    attachEvents()
}

//监听手动控制属性的变化，动态绑定或取消事件
watch(() => props.manual, (isManual) => {
    if (isManual) {
        events = {}
        outerEvents = {}
    } else {
        attachEvents()
    }
})

//监听触发方式属性的变化，重新绑定事件
watch(() => props.trigger, (newTrigger, oldTrigger) => {
    if(newTrigger !== oldTrigger) {
        events = {}
        outerEvents = {}
        attachEvents()
    }
})

//监听isOpen变量的变化，创建或销毁Popper实例
watch(isOpen, (newValue) => {
    if(newValue) {
        if(triggerNode.value && popperNode.value) {
            popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
        }
    } else {
        popperInstance?.destroy()
    }
}, {flush: 'post'})

//在组件销毁时销毁popper实例
onUnmounted(() => {
    popperInstance?.destroy()
})

//暴露给父组件的方法
defineExpose<TooltipInstance>({
    'show': openFinal,
    'hide': closeFinal
})

</script> 