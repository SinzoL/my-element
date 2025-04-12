//尺寸
export type SwitchSize = 'large' | 'small'


//值类型
export type SwitchValueType = boolean | string | number

//组件的props
export interface SwitchProps {
    name?: string
    size?: SwitchSize
    disabled?: boolean
    activeText?: string
    modelValue?: SwitchValueType
    activeColor?: string
    inactiveText?: string
    inlinePrompt?: boolean
    inactiveColor?: string
    activeValue?: SwitchValueType
    inactiveValue?: SwitchValueType
    //onChange?: (value: SwitchValue) => void
}

//事件
export interface SwitchEmits {
    (e: 'update:modelValue', value: SwitchValueType): void
    (e: 'change', value: SwitchValueType): void
}

