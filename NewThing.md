# 一些开发中的技术问题

#### 1.关于computed和watch的返回值

computed的返回值是computedRef，继承自ref，是响应式类型变量，而watch的返回值是停止监视函数，当你调用后就会停止建设那个监听操作

#### 2.函数包装变量产生的响应式
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


#### 3.关于注解和值初始化
const fields: FormItemContext[] = []

这一句代码说的是指定fields是一个特定类型的数组，然后其中只能添加该类型的数据，然后开始赋值为空，是一种声明时的约束，类型断言（as type）则是运行时的强制转换，我们可以看到，如下的一行代码

const fields = [] as FormItemContext[];

#### 4.新增一个组件的步骤

1.在src/components/中添加相应的文件夹
2.建立必要的vue、type.ts、style.css文件
3.先设计好相应的组件，然后编写对应的样式和设计文件
4.在总的/style/index.css文件中引入对应的样式文件









