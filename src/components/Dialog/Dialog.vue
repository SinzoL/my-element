<template>
  <div class="el-dialog" v-show="visible">
    <div
      ref="dialogWrapper"
      class="el-dialog-wrapper"
      :style="{ top: `${dialogTop}px`, left: `${dialogLeft}px` }"
      @mousedown="startDragging"
    >
      <div class="el-dialog-header">
        <span> {{ props.title }} </span>
        <button @click="closeDialog"> X </button>
      </div>
      <div class="el-dialog-content">
        <slot> </slot>
      </div>
      <div class="el-dialog-footer">
        <slot name="footer"> 
            <el-button type="info" @click="closeDialog"> 取消 </el-button>
            <el-button type="primary" @click="confirmDialog"> 确定 </el-button>
        </slot>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount,defineOptions } from "vue";
import ElButton from "../Button/Button.vue";

defineOptions({
    name: 'ElDialog'
})

const props = defineProps(['visible', 'title'])

const dialogTop = ref(0)
const dialogLeft = ref(0)

let isDragging = false
let offsetX = 0
let offsetY = 0

const startDragging = (e: MouseEvent) => {
    isDragging = true
    offsetX = e.clientX - dialogLeft.value; 
    offsetY = e.clientY - dialogTop.value;
}

const stopDraging = () => {
    isDragging = false
}

const handleDragging = (e: MouseEvent) => {
    if(isDragging) {
        dialogLeft.value = e.clientX - offsetX
        dialogTop.value = e.clientY - offsetY       
    }
}

onMounted(() => {
    window.addEventListener('mousemove', handleDragging)
    window.addEventListener('mouseup', stopDraging)
})


const closeDialog = () => {
    //关闭逻辑
}

const confirmDialog = () => {
    //确认逻辑
}
closeDialog()
confirmDialog()
onBeforeUnmount(() => {
    window.removeEventListener('mousemove', handleDragging)
    window.removeEventListener('mouseup', stopDraging)
})

</script>