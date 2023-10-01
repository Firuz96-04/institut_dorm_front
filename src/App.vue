<script setup>
import {computed} from 'vue'
import Message from 'primevue/message';
import {useNotifyStore} from '@/store/notification'

const notifyStore = useNotifyStore()

const notifications = computed(() => notifyStore.getNotification) 
</script>

<template>
    <Toast />  
    <div class="my_style">
        <template v-for="(item, idx) in notifications" :key="idx">
            <Message style="width: 300px;" :closable="false" :severity="item.status" :life="5000">{{ item.message }}</Message>
        </template>
    </div>
    <router-view />
</template>

<style lang="scss" scoped>
.my_style {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1002;
    // margin-right: 20px;
    
}
</style>
