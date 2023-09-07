<script setup>

import Message from 'primevue/message';
import {computed} from 'vue'

import { useNotifyStore } from '@/store/notification';
const useNotify = useNotifyStore()

const notifications = computed(() => useNotify.getNotification)


console.log(notifications);
</script>

<template>
    <Toast />  
    <Message v-if="notifications.length" :life="5000" v-for="item in notifications" style="margin-top: 100px" :severity="item.severity"> 
        eeeeeeeeeeeeeeeeeeee {{ item.message }} 
    </Message>


    <router-view />
</template>

<style scoped></style>
