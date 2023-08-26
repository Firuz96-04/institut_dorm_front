<script setup>
import {defineProps, defineEmits} from 'vue'

const emits = defineEmits({
    close: null
})

const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})


const closeModal = () => {
    emits('close')
}

console.log('meee');



</script>
<template>
<!-- @update:modelValue="timer = $event" -->
      <Dialog :visible="visible" @update:visible="closeModal"  modal header="Header" :style="{ width: '50vw' }">
        <button @click="closeModal"></button>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
         Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
</Dialog>
</template>