import type { App } from 'vue'
import Button from "./Button.vue"
// 注册组件
Button.install = function(app: App) {
  app.component(Button.name as string, Button)
}
export default Button
export * from './types.ts'
