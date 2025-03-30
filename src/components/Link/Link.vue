<template>
    <a 
        class="el-link"
        :class="computedClass"
        :href="disabled || !href?'':href"
        :target="disabled || !href? undefined:target"
        @click="handleClick"
        >
        <el-icon v-if="icon" :icon="icon" :size="size" />
        <span class="el-link__inner">
            <slot>Link</slot>
        </span>
    </a>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {LinkProps} from './types'
import {linkEmits} from './types'
import ElIcon from '../Icon/Icon.vue'

defineOptions({
    name: 'ElLink'
})

const props = withDefaults(defineProps<LinkProps>(), {
    type: 'default',
    underline: false,
    disabled: false,
    target: '_self'
})

const emits = defineEmits(linkEmits)

const computedClass = computed(() => {
    const {type, underline, disabled} = props
    return [
        `el-link--${type}`,
        {
            'is-underline': underline,
            'is-disabled': disabled
        }
    ]
})

const handleClick = (e: MouseEvent) => {
    if(props.disabled) {
        e.preventDefault()
        return
    }
    emits('click', e)
}

</script>