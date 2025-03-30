<template lang="">
    <div>
      <h3> button </h3>
      <ElButton type="primary">button</ElButton>
      <ElButton type="danger">button</ElButton>
    </div>
  </template>
<script setup lang="ts">
import ElButton from '@/components/Button/Button.vue'
defineOptions({
  name: 'ButtonView'
})
</script>
