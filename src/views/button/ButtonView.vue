<template lang="">
    <div>
      <h4> button </h4>
      <ElButton type="primary">Button1</ElButton>
      <ElButton type="danger">Button2</ElButton>
      <ElButton type="warning">Button3</ElButton>
      <ElButton type="info">Button4</ElButton>
    </div>
  </template>
<script setup lang="ts">
import ElButton from '@/components/Button/Button.vue'
defineOptions({
  name: 'ButtonView'
})
</script>
