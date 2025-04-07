<template> 
    <div
        classv="el-form-item"
        ref="formItemRef"
        :class="{
            'is-error': validateStatus.state === 'error',
            'is-success': validateStatus.state === 'success',
            'is-loadding': validateStatus.loading,
            'is-requireed': isRequired
        }"
        >
    </div>
    

</template>

<script setup lang="ts"> 

import {inject, reactive, ref , computed, onMounted, onUnmounted, prodide } from 'vue'
import AsyncValidator from 'async-validator'
import type {RuleItem} from 'async-validator'
import {isNil} from 'lodash-es'
import {formItemProps, formContextKey, formItemContextKey} from './types'
import type { FormItemContext, FormValidateFailure } from './types'

//定义props
const props = defineProps(formItemProps)

//设置组件选项
defineOptions({
    name: 'ElFormItem'
})

//获取表单上下文
const formContext = inject(formContextKey)

//定义验证状态
const validateStatus = reactive({
    state: 'init',
    message: '',
    loading: false
})

//计算属性
const innerValue = computed(() => {
    //获取表单模型
    const model = formContext?.model

    if(model && props.prop && !isNil(model[props.prop])) {
        return model[props.prop]
    } else {
        return null
    }
})

//初始值
let initialValue: any = undefined

const getItemRules = computed(() => { 
    const rules = formContext?.rules
    if (rules && props.prop && rules[props.prop]) {
        return rules[props.prop]
    } else {
        return []
    }
})

//是否为必填项的计算属性
const isRequired = computed(() => {
    return getItemRules.value?.some(rule => rule.required)
})

const getTriggeredRules = (trigger?: string) => {
    const itemRules = getItemRules.value
    if(itemRules) {
        return itemRules.filter(rule => {
            if(!rule.trigger || !trigger) return true
            return rule.trigger && rule.trigger === trigger
        }).map(({{ trigger, ...rule }}) : RuleItem => rule)
    } else {
        return []
    }
}

</script>
