<template>
  <div class="container">
    <h4> Container </h4>
    <el-container>
      <el-aside :width="100">Aside</el-aside>
      <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import ElContainer from '@/components/Container/Container.vue'
import ElHeader from '@/components/Container/MainHeader.vue'
import ElMain from '@/components/Container/Main.vue'
import ElAside from '@/components/Container/MainAside.vue'

defineOptions({
  name: 'ContainerView'
})
</script>

<style scoped>
.container{
    width: 100vh;
    height: 100vh;
}

</style>