<template>
  <div class="el-timer-container">
    <div class="el-timer">
      <p class="el-time-display">{{ formatTime }}</p>
      <div class="el-buttons">
        <button
          class="el-button el-button--success"
          @click="startTimer"
          :disabled="isRunning"
        >
          Start
        </button>
        <button
          class="el-button el-button--danger"
          @click="stopTimer"
          :disabled="!isRunning"
        >
          Stop
        </button>
        <button class="el-button el-button--primary" @click="resetTimer">Reset</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onMounted, watch } from "vue";
import { TimerProps } from "./types.ts";

// 定义 props 类型
const props = defineProps<TimerProps>();

// 定义组件名称
defineOptions({
  name: 'ElTimer'
});

// 使用 props 初始化计时器的秒数和运行状态
const seconds = ref(props.initialTime || 0); // 用于记录秒数
const isRunning = ref(props.isRunning || false); // 控制计时器是否运行
let intervalId = null; // 计时器的ID

// 计算并格式化时间
const formatTime = computed(() => {
  const mins = Math.floor(seconds.value / 60).toString().padStart(2, "0");
  const secs = (seconds.value % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
});

// 开始计时
const startTimer = () => {
  if (isRunning.value) return;
  isRunning.value = true;
  intervalId = setInterval(() => {
    seconds.value++;
  }, 1000);
};

// 停止计时
const stopTimer = () => {
  clearInterval(intervalId);
  isRunning.value = false;
};

// 重置计时器
const resetTimer = () => {
  clearInterval(intervalId);
  isRunning.value = false;
  seconds.value = props.initialTime || 0; // 重置为初始时间
};

// 在组件挂载时检查 isRunning 的初始值，自动启动计时器
onMounted(() => {
  if (isRunning.value) {
    startTimer(); // 如果 isRunning 为 true，则自动开始计时
  }
});

// 监控 isRunning 的变化，自动开始或停止计时
watch(isRunning, (newVal) => {
  if (newVal) {
    startTimer();
  } else {
    stopTimer();
  }
});

// 清理计时器，防止内存泄漏
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style src="./style.css"></style>
