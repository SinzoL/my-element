<template>
    <transition name="el-alert-fade">
        <div class="el-alert" :class="elAlertClass" v-show="visible">
            <div class="el-alert__content">
                <span v-if="showIcon">
                    <el-icon :icon="showAlertIcon()" @click.stop="visible=false"></el-icon> 
                </span>
                <div class="el-alert__message">
                    <p class="el-alert__title">
                        <slot name="title"> {{ title }}</slot>
                    </p>
                    <p v-if="description" class="el-alert--description">
                        <slot> {{ description }}</slot>
                    </p>
                </div>
            </div>
            <template v-if="closable">
                <div v-if="closeText" @click="closeAlert" class="closeBtn">
                    {{closeText}}
                </div>
                <el-icon v-else icon="xmark" @click="closeAlert" class="closeBtn"></el-icon>
            </template>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { AlertProps, alertEmits } from "./types"
import ElIcon from "../Icon/Icon.vue"

//设置组件名
defineOptions({
    name: "elAlert",
})

//设置默认属性
const props = withDefaults(defineProps<AlertProps>(), {
    effect: "light",
    closeable:true
})

//定义事件触发器
const emit = defineEmits(alertEmits);

//计算Alert组件的样式类
const elAlertClass = computed(() => {
    const { type, closable, center, showIcon, effect} = props;
    return {
        [`el-alert--${type}`]: type,
        [`el-alert--${effect}`]: effect,
        "is-closable": closable,
        "is-center": center,
        "has-icon": showIcon,
    };
});

//控制显示状态
const visible = ref(true);

//关闭弹窗
const closeAlert = (evt: MouseEvent) => {
    visible.value = false;
    emit("close", evt)
}

//根据警报类型返回相应的图标名称
const showAlertIcon = () => {
    switch(props.type) {
        case "error":
            return "circle-xmark"
        case "info":
            return "circle-info"
        case "success":
            return "circle-check"
        case "warning":
            return "circle-exclamation"
        default: 
            return "circle-xmark" 
    }
}


</script>
