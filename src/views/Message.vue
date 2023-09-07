<script setup>
import { useNotifyStore } from '@/store/notification';
import {ref} from 'vue'
const useNotify = useNotifyStore()
const message = ref('')
const addMessage = () => {
    useNotify.addNotification({message: message.value,severity: "error" })
    message.value = ''
}
</script>
<template>

<input v-model="message"/>

<button @click="addMessage">add message</button>
</template>