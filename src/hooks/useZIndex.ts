import {computed, ref} from 'vue'

const zIndex = ref(0)

const useZIndex = (initValue = 0) => {
    const initZIndex = ref(initValue)
    const currentZIndex = computed(() => initZIndex.value + zIndex.value)
    const increaseZIndex = () => {
        zIndex.value++
        return currentZIndex.value
    }
    const decreaseZIndex = () => {
        zIndex.value--
        return currentZIndex.value
    }
    return {
        currentZIndex,
        increaseZIndex,
        decreaseZIndex,
    }
}

export default useZIndex