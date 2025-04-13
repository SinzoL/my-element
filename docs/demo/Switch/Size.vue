<template lang="">
  <div>
    <el-switch v-model="value1" size="small"/>
    <el-switch v-model="value2" size="large"/>
  </div>
</template>
<script setup>
import ElSwitch from '@/components/Switch/Switch.vue'
import { ref } from 'vue'
const value1 = ref(true)
const value2 = ref(true)
</script>