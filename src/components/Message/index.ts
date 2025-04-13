import Message from '@/components/Message/Message.vue'
import {createMessgae, closeAll} from './method'
import {App}from 'vue'

Message.install = (app:App) => {
    app.component('ElMessage', Message);
}

export default Message

export {
    createMessage, 
    closeAll
}