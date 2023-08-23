<script setup>
import Server from '../service/AuthService'
const login = () => {
    const sever = new Server()
    sever.login()
        console.log('login');
}
</script>
<template>
    <div>
        Privilege
        <button @click="login">log</button>
    </div>
</template>