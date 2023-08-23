<script setup>
import { computed, ref } from 'vue';
import { useFreePlaceStore } from '@/store/free_place';

const freeStore = useFreePlaceStore();
freeStore.setAllFreePlace();

const free_places = computed(() => freeStore.getAllFreePlace);
</script>
<template>
    <div>
        {{ free_places }}
        Free
    </div>
</template>