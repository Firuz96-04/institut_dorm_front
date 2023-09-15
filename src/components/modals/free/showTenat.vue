<script setup>
import {defineProps, defineEmits, watch,} from 'vue'
const props = defineProps({
    room: {
        type: Object,
        required: true
    },
    visible: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits({
    close: null
})

const closeModal = () => {
    emits("close")
}

watch(
    () => props.room,
    (room) => {
        if (room.length > 0) {
            console.log(room, 'data');
            
        }
    }
)
</script>
<template>
<Dialog :visible="visible" @update:visible="closeModal" modal header="Header" :style="{ width: '50vw' }">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

</Dialog>
</template>

<style lang="scss">
</style>