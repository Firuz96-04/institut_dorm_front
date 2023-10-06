<script setup>
import {computed, onMounted, onBeforeMount} from 'vue'
import Message from 'primevue/message';
import {useNotifyStore} from '@/store/notification'
import EventBus  from '@/common/EventBus'
import {useAuthStore} from '@/store/auth'
import { useRouter } from 'vue-router';
const authStore = useAuthStore()
const notifyStore = useNotifyStore()

const notifications = computed(() => notifyStore.getNotification) 
const router = useRouter();

const logOut = () => {
    authStore.logout()
    router.push('login')
}

onMounted(() => {
    EventBus.on("logout", () => {
        logOut();
    });
})

onBeforeMount(() => {
    EventBus.remove("logout");
})
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
