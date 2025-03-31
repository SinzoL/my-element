## 1.关于computed和watch的返回值

computed的返回值是computedRef，继承自ref，是响应式类型变量，而watch的返回值是停止监视函数，当你调用后就会停止建设那个监听操作

## 2.函数包装变量产生的响应式
const inputType = ref(props.type);
watch(() => props.type, (newType) => {
    inputType.value = newType
})

这里面inputType最终被赋值了type，然后之后都是响应式监听来修改值的变化，在以后的每一次修改，将会响应式监听这里的父组件传来的props的type数据，然后注意在watch中传入的第一个参数，使用函数封装过的，这是因为这样子才能够进行追踪到依赖。
定义了这个reactive变量后再使用watch函数进行监听
const state = reactive({ 
  type: 'text',
  config: { size: 'large' }
});
watch(state, (newVal) => {
  console.log('整个state变化:', newVal);
});
但是不幸的是这种监听会导致冗余回调，即任意的属性变化都会触发
所以我们应该是使用函数来封装特定的子属性，然后监听该属性，保证性能

如果直接传值就会丢失响应式关联（传递的是当前值的快照，脱离了proxy的响应式控制）
如果该属性内部还是对象的话，甚至的开启深度监听模式
watch(() => state.obj, callback, { deep: true })
