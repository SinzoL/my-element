<template>
    <div class="el-collapse">
        <slot> </slot>
    </div>
</template>
<script setup lang="ts">
import {ref, provide, watch} from 'vue'
import type {CollapseActiveName, CollapseEmits} from './types'
import type {CollapseProps, collapseContextKey} from './types'

defineOptions({
    name: 'ElCollapse'
})

const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

const activeNames = ref<CollapseActiveName[]>([])

watch(() => props.modelValue, () => {
    activeNames.value = props.modelValue
})

const setActiveNames = (_activeNames: CollapseActiveName[]) => {
    activeNames.value = _activeNames
    emits('update:modelVaalue', activeNames.value);
    emits('change', activeNames.value);
}

const handleItemClick = (name: CollapseActiveName) => {
    const _activeNames = [...activeNames.value];
    if(props.accordion) {
        setActiveNames([activeNames.value[0] === name ? '' : name]);
    }else {
        const index = _activeNames.indexOf(name);
        if(index > -1) {
            _activeNames.splice(index, 1)
        }else {
            _activeNames.push(name)
        }
        setActiveNames(_activeNames)
    }
}

provide(collapseContextKey, {   
   activeNames,
   handleItemClick
})

</script>