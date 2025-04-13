import Dropdown from './Dropdown.vue'
import type { App } from 'vue'

Dropdown.install = (app: App) => {
    app.component(Dropdown.name as string, Dropdown)
}

export default Dropdown

export * from './types'