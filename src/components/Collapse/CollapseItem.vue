<template>
  <div
    class="el-collapse-items"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="el-collapse-title"
      :id="`item-title-${name}`"
      @click="handleClick"
      :class="{
        'is-active': isActive,
      }"
    >
      <slot name="title"> {{ title }} </slot>
      <el-icon icon="angle-right" class="header-angle" />
    </div>

    <div 
    class="el-collapse-item-content" 
    v-show="isActive" 
    :id="`item-content-${name}`"
    >
      <slot> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {inject, computed} from 'vue'
import {collapseContextKey} from './types'
import type {CollapseItemProps} from './types'
import ElIcon from '../Icon/Icon.vue'

defineOptions({
    name: 'ElCollapseItem'
})

const props = defineProps<CollapseItemProps>()

const collapseContext = inject(collapseContextKey)

const isActive = computed(() => {
    return collapseContext?.activeNames.value.includes(props.name)
})


const handleClick = () => {
  if(props.disabled) return
  collapseContext?.handleItemClick(props.name)
}

</script>
