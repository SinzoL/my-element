//用于将传入的虚拟节点渲染成真实节点


//导入Vue的defineComponent函数，用于定义Vue组件
import { defineComponent} from 'vue'

//定义一个名为RenderVNode的Vue组件
const RenderVNode = defineComponent({
    //定义组件属性
    props: {
        //接受一个名为vNode的虚拟节点
        vNode: {
            //属性类型可以是字符串或对象
            type:[String, Object],
            //vNode属性是必须的
            required: true
        }
    },

    //设置组件的逻辑
    setup(props) {
        //返回一个函数，这个函数返回传递进来的虚拟节点
        return () => props.vNode
    }
})

//到处RenderVNode组件
export default RenderVNode