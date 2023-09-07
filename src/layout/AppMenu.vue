<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Главная', icon: 'fa-house', to: '/' }]
    },
    {
        label: '',
        items: [
            { label: 'Main', icon: 'fa-house', to: '/main' },
            { label: 'Заселить', icon: 'fa-calendar-days', to: '/free' },
            { label: 'Жильцы ', icon: 'fa-building-user', to: '/booking' },
            { label: 'Оплаты ', icon: 'fa-hand-holding-dollar', to: '/payment' },
            { label: 'Комнаты', icon: 'fa-door-closed', to: '/room' },
            { label: 'Здание', icon: 'fa-hotel', to: '/building' },
            { label: 'Студенты', icon: 'fa-users', to: '/student' },
            { label: 'Факультеты', icon: 'fa-landmark', to: '/faculty' },
            { label: 'Страны', icon: 'fa-globe', to: '/country' }, 
            { label: 'Привилегии', icon: 'fa-certificate', to: '/privilege'}, 
            { label: 'Сотрудники', icon: 'fa-user-tie', to: '/employee'}, 
        ]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
        ]
    },

]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
