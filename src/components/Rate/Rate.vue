<template>
    <div class="el-rate" :style="{color: voidColor}">
        <span
            v-for="num in max"
            class="iconfont icon-star"
            :key="num"
            :class="{ active: num <= rateNum, [`el-rate--${size}`]:true }"
            :style="{
                'color': num <= rateNum? color: voidColor
            }"
            @click="setRateNum(num)"
            ></span>
    </div>
</template>

<script lang="ts" setup>
import { RateProps, RateEmits } from "./types";
import { useRate } from "./useRate";

const props = withDefaults(defineProps<RateProps>(), {
  nums: 3,
  size: "default",
  max: 5,
});

const emits = defineEmits<RateEmits>();

defineOptions({
    name: 'ElRate'
})

const [rateNum, setRateNum] = useRate(props.num??0, () => {
    emits('changeRateNums', rateNum.value);
})
</script>
