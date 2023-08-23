<script setup>
import { computed } from 'vue';
import { useBuildingStore } from '@/store/building';

const buildingStore = useBuildingStore();
buildingStore.setAllBuilding();

const buildings = computed(() => buildingStore.allBuilding);


</script>
<template>
    <div>{{ buildings }}</div>
</template>
