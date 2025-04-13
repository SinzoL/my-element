import type { VNode } from "vue";
import type { TooltipProps } from "../Tooltip/types";

//下拉菜单的选项
export interface MenuOption {
    label: string | VNode
    key:   string | number
    disabled?: boolean
    divided?: boolean    
}

//传入数组作为props
export interface DropdownProps extends TooltipProps {
    menuOptions: MenuOption[]
    hideAfterClick?: boolean
}

export interface DropdownEmits {
    (e: 'select', option: MenuOption): void
    (e: 'visibleChange', value: boolean): void
}

export interface DropdownInstance {
    show: () => void
    hide: () => void
}