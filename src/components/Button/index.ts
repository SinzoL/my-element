import type { App } from 'vue'
import Button from "./Button.vue"
// 注册组件
Button.install = function(app: App) {
  app.component(Button.name as string, Button)
}
export default Button
export * from './types.ts'


//全局注册我的button组件
//还可以简化引用路径
//导出了types.ts,方便类型推导
//方便组件扩展