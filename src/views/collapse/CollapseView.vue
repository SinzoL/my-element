<template>
  <div class="container basic block">
    <el-container>
      <el-collapse v-model="openedValue" accordion>
        <el-collapse-item name="a">
          <template #title> Title1 </template>
          <template #default> Content1 </template>
        </el-collapse-item>
        <el-collapse-item name="b">
          <template #title> Title2 </template>
          <template #default> Content2 </template>
        </el-collapse-item>
        <el-collapse-item name="c">
          <template #title> Title3 </template>
          <template #default> Content3 </template>
        </el-collapse-item>
      </el-collapse>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import ElCollapse from "@/components/Collapse/Collapse.vue";
import ElCollapseItem from "@/components/Collapse/CollapseItem.vue";
import { ref } from "vue";
const openedValue = ref(["a"]);

defineOptions({
  name: "CollapseView",
});

import ElContainer from "@/components/Container/Container.vue";

</script>

<style scoped>
.container{
    width: 100vh;
    height: 100vh;
    background-color: rgb(205, 238, 238);
    font-size:20px;
    color: rgb(0, 0, 0);
}

</style>
