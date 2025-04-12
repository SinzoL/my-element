<template>
    <div class="el-switch"
        @click="toggleSwitch"
        :class="{ 'is-checked':  switchOn, 'is-disabled': disabled, [`el-switch-${size}`]: size }"
        >
        <input 
        ref="inputRef"
        type="checkbox" 
        class="el-switch__input" 
        role="switch"
        :name="name" 
        :disabled="disabled"
        @keydown.enter="toggleSwitch"
        style="display: none"
        >
        <!--inactiveText文字描述-->
        <span class="el-switch__label el-switch__label--left" 
            v-if="!inlinePrompt && inactiveText"
            >
            {{ inactiveText }}
        </span>
        <!--switch开关结构-->
        <span class="el-switch__core" :style="switchStyle">
            <div class="el-switch__inner" >
                <span v-if="inlinePrompt&&(activeText || inactiveText)" class="is-text">
                    {{ switchOn ? activeText : inactiveText }}
                </span>
            </div>
            <div class="el-switch__action"/>
        </span>
        <!--activeText文字描述-->
        <span class="el-switch__label el-switch__label--right" 
            v-if="!inlinePrompt && activeText"
            >
            {{ activeText }}
        </span>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import {SwitchProps, SwitchEmits} from './types'

defineOptions({
    name: 'ElSwitch'
})
const inputRef = ref<HTMLInputElement>()

//默认属性
const props = withDefaults(defineProps<SwitchProps>(), {
    size: 'large',
    disabled: false,
    activeValue: true,
    inactiveValue: false,
    inlinePrompt: false,
})

//Switch的选项值
const switchValue = ref(props.modelValue)
const emits = defineEmits<SwitchEmits>()

const switchOn = ref(props.modelValue === props.activeValue)

watch(() => props.modelValue, (newValue) => {
    switchValue.value = newValue
    switchOn.value = newValue === props.activeValue
})

//切换状态
const toggleSwitch = () => {
    if(!props.disabled) {
        switchOn.value = !switchOn.value
        const newValue = switchOn.value ? props.activeValue : props.inactiveValue
        emits('update:modelValue', newValue)
        emits('change', newValue)
    }
}

watch(switchOn, (newValue) => {
    if (inputRef.value) {
        inputRef.value.checked = newValue;
    }
})

const switchStyle = computed(() => {
    return {
        backgroundColor: switchOn.value? props.activeColor: props.inactiveColor,
        border: switchOn.value? props.activeColor: props.inactiveColor
    }

})

</script>