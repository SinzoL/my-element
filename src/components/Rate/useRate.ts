import { ref,Ref } from 'vue'

//自定义hook用于管理评分组件的状态
export function useRate(initialNum: number, callback:() => void): 
[Ref<number>, (num: number) => void] {
    //创建响应式变量rateNum，用于存储评分数量
    const rateNum: Ref<number> = ref(initialNum)
    const setRateNum = (num: number): void => {
        rateNum.value = num
        callback()
    }

    //返回rateNum和setRateNum两个函数
    return [rateNum, setRateNum]
}

