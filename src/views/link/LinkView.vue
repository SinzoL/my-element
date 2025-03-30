<template>
    <div>
        <h4> Link </h4>
        <ElLink type="primary">Link1</ElLink>
        <ElLink type="danger">Link2</ElLink>
        <ElLink type="warning">Link3</ElLink>
        <ElLink type="info">Link4</ElLink>
    </div>
</template>
<script setup lang="ts">
import ElLink from '@/components/Link/Link.vue'
defineOptions({
    name: 'LinkView'
})
</script>