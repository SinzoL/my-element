<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import ElContainer from '@/components/Container/Container.vue'
import ElHeader from '@/components/Container/MainHeader.vue'
import ElMain from '@/components/Container/Main.vue'
import ElAside from '@/components/Container/MainAside.vue'
</script>
