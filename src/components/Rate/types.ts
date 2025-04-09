//定义星级评分组件的大小类型
export type RateSize = 'large' | 'default' | 'small'

//定义星际评分组件的props
export interface RateProps {
    num?: number,           //星星数量
    size?: RateSize,        //星星大小，支持“large”,"default","small"
    max?: number,           //最大分数
    color?: '',             //星星数量
    voidColor?: ''          //未选中星星的颜色
}

export interface RateEmits {
    //改变评分数量事件
    (e: 'changeRateNums', value: number):void 
}

