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
            { label: 'Главная', icon: 'fa-house', to: '/' },
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
        ]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
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
