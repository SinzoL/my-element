export type AlertType = 'success' | 'warning' | 'info' | 'error'

export type EffectType = 'light' | 'dark'

export interface AlertProps {
    title: string;           //警报标题
    type:AlertType;          //警报类型
    description?: string;    //警报描述
    closable?:boolean;       //石佛可以关闭
    center?:boolean;         //是否居中显示
    showIcon?:boolean;       //是否显示图标
    effect?:EffectType;      //效果类型
    closeText?:string;       //关闭按钮文本
}

//定义Alert组件的事件对象
export const alertEmits = {
    //关闭事件
    close: (evt: MouseEvent) => evt instanceof MouseEvent, 
}

//定义Alert组件事件类型
export type AlertEmits = typeof alertEmits

//定义Alert实例接口
export interface AlertInstance {
    hide: () => void;//隐藏Alert的方法
}