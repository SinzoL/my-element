//定义Input组件的属性列表

export interface InputProps {
    modelValue?: string;     //输入框的值
    type?:string;            //输入框的类型，如'text','password'等
    disabled?: boolean;      //是否禁用输入框
    showClear?:boolean;      //是否显示清除按钮
    placeholder?:string;     //输入框的占位符
    size?:string;            //输入框的大小
    showPassword?:boolean;   //是否显示密码
    prefixIcon?:string;      //输入框的前缀图标
    suffixIcon?:string;      //输入框的后缀标签
    label?:string;           //输入框的标签
    readonly?:boolean;       //输入框的标签文本
    autofocus?:boolean;      //是否自动获取焦点
    form?:string;            //表单名称
    validateEvent?:boolean;  //是否需要检验
    autocomplete?:string;    //是否自动填充
}

//定义Input组件的事件列表

export interface InputEmits {
    (e: 'update:modelValue', value: string): void; //值改变，随时关注输入，Vue3规范双向绑定
    (e: 'change', value: string): void;            //值改变，需失去焦点，最终验证
    (e: 'input', value: string): void;             //值改变，兼容原生js和Vue2
    (e: 'focus', value: FocusEvent): void;             //获取焦点时触发
    (e: 'blur', value: FocusEvent): void;              //失去焦点时触发
    (e: 'clear'): void                             //清除输入
}

export interface InputInstance {
    ref: HTMLInputElement      //输入框的引用
}