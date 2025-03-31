import type {Ref, InjectionKey} from 'vue'

export type CollapseActiveName = string | number

export interface CollapseItemProps{
    name: CollapseActiveName
    disabled?: boolean,
    title?:string
}

export interface CollapseContext {
    activeNames: Ref<CollapseActiveName[]>,

    handleItemClick: (name: CollapseActiveName) => void
}
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')

export interface CollapseProps {
    modelValue: CollapseActiveName[];
    accordion?: boolean;
}

export interface CollapseEmits {
    (e: 'update:modelValue', value: CollapseActiveName[]): void
    (e: 'change', values: CollapseActiveName[]): void
}   