import type { Placement, Options} from '@popperjs/core';

//定义Tooltip组件的属性接口
export interface TooltipProps {
    content?: string                  //提示内容
    trigger?: 'hover' | 'click'       //触发方式，点击或悬浮
    placement?: Placement             //提示框位置
    manual?: boolean                  //是否手动控制显示
    popperOptions?: Partial<Options>  //popper的实例选项
    tran?: string               //过渡效果
    openDelay?: number                //打开延时
    closeDelay?: number               //关闭延时
}

//定义Tooltip组件的事件触发器
export interface TooltipEmits {
    (e: 'visible-change', value: boolean) : void
    (e: 'click-outside',  value: boolean) : void
}


//定义Tooeltip组件的实例接口
export interface TooltipInstance {
    //显示提示框的方法
    show: () => void
    //隐藏提示框的方法
    hide: () => void
}


