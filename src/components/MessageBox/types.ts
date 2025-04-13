export interface MessageBoxOptions {
    type?: 'success' | 'info' | 'warning' | 'error';
    title?: string;                      //额外字段
    content?: string;                    //内容
    showCancelButton?: boolean;          //是否显示取消按钮
    confirmBtnText?: string;             //确认文字
    cancelBtnText?: string;              //取消文字
    closeOnClickModal?: boolean;         //是否在点击框外时关闭弹窗
    center?: boolean;                    //弹出位置
    field?:string
    [key: string]: unknown               //允许添加额外自定义属性
}


export type ActionType = 'confirm' | 'cancel' | 'close'