import type { PropType } from "vue";

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'small' | 'medium' | 'large';
export type NativeType = 'button' | 'submit' | 'reset';

export const buttonProps = {
    type: {
        type: String as PropType<ButtonType>,
        default: 'primary'
    },
    size: {
        type: String as PropType<ButtonSize>,
        default: 'medium'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    nativeType: {
        type: String as PropType<NativeType>,
        default: 'button'
    },
    plain: {
        type: Boolean,
        default: false
    },
    round: {
        type: Boolean,
        default: false
    },
    circle: {
        type: Boolean,
        default: false
    },
    autofocus: {
        type: Boolean,
        default: false
    },
    icon:{
        type: String,
        default: ''
    },
    loading:{
        type: Boolean,
        default: false
    }
};