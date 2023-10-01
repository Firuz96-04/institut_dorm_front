<script setup>
import { useNotifyStore } from '@/store/notification';
import {ref} from 'vue'
import AuthService from '../service/auth-service'
const useNotify = useNotifyStore()
const message = ref('')
const addMessage = () => {
    useNotify.addNotification({message: message.value,severity: "error" })
    message.value = ''
}

const login = () => {
    const user = {
        email: 'lll@gmail.com',
        password: 'lll_12345'
    }
    AuthService.login(user)
}
</script>
<template>

<input v-model="message"/>

<button @click="addMessage">add message</button>
Privilege
        <button @click="login">log</button>
</template>