//定义DatePicker组件的事件列表

export interface selectEmits {
    (e: 'update:selectedDate', value: Date): void //值改变，随时关注输入，Vue3规范双向绑定
}

export interface InputInstance {
    ref: HTMLInputElement      //输入框的引用
}