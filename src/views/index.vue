<template>
    <div>
        <h2> My Element </h2>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'IndexView'
})
</script>