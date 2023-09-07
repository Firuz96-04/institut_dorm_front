<script setup>
import { useMainStore } from '@/store/main_dorm';
import { computed, ref } from 'vue';
import MainCard from '@/components/cards/MainCard.vue'

const mainStore = useMainStore();
mainStore.setAllMain();

const main = computed(() => mainStore.allMain)
</script>
<template>
    <div class="main_card">  
        <MainCard v-for="item in main" :build="item"/>
    </div>
</template>

<style lang="scss" scoped>
.main_card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>
