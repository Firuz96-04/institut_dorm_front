<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import {useAuthStore} from '@/store/auth'
const { layoutConfig, onMenuToggle } = useLayout();

const authStore = useAuthStore()

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();
onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

const items = ref([
    { separator: true },
    {
        label: 'Настройки',
        icon: 'pi pi-fw pi-cog',
        command: () => {
           
        }
    },
    { separator: true },
    {
        label: 'Выйти',
        icon: 'pi pi-sign-out',
        command: () => {
            authStore.logout()
            router.push('login')
        }
    }
]);

const toggle = (event) => {
    menu.value.toggle(event);
};

const menu = ref();
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>Общежития</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <div>
                <button @click="toggle" class="p-link layout-topbar-button">
                    <i class="pi pi-user"></i>
                    <span>Profile</span>
                </button>
                <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
                    <template #start>
                        <button class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
                            <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" /> -->
                            <div class="flex flex-column align">
                                <span class="font-bold">Админ</span>
                                <!-- <span class="text-sm">Agent</span> -->
                            </div>
                        </button>
                    </template>
                    <template #item="{ item }">
                        <div style="display: flex; justify-content: start">
                            <button class="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround">
                                <i :class="item.icon" />
                                <span class="ml-2">{{ item.label }}</span>
                            </button>
                        </div>
                    </template>
                </Menu>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
