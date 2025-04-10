//检测是否点击了组件的范围外

import { onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

const useClickOutside = (el: Ref<HTMLElement | undefined>, callback: (e: MouseEvent) => void) => {
    const handler = (e: MouseEvent) => {
        if (el.value && e.target) {

            //点击元素不在元素内部，则使用回调函数
            if (!el.value.contains(e.target as HTMLElement)) {
                callback(e)
            }
        }
    }
    //挂载时添加click监听器
    onMounted(() => {
        document.addEventListener('click', handler)
    })
    //卸载时移除click事件监听器，防止内存泄漏
    onUnmounted(() => {
        document.removeEventListener('click', handler)
    })
}


export default useClickOutside
