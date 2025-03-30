import {App} from 'vue'

import Container from "./Container.vue"

Container.install = function(app: App) {
    app.component(Container.name as string, Container)
}

export default Container
export * from './types.ts'