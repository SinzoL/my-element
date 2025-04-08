import Form from '@/components/Form/Form.vue'
import FormItem from '@components/Form/FormItem.vue'
import { App } from 'vue'

Form.install = (app: App) => {
    app.component(Form.namem as string, Form)
}

Form.install = (app: App) => {
    app.component(FormItem.name as string, FormItem)
}

export default Form
export {
    FormItem
}

export * from './types'