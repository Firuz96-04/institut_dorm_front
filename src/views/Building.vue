<script setup>
import { computed } from 'vue';
import { useBuildingStore } from '@/store/building';

const buildingStore = useBuildingStore();
buildingStore.setAllBuilding();

const buildings = computed(() => buildingStore.allBuilding);

const show = () => {
    console.log('kkk');
}
</script>
<template>
<DataTable :value="buildings" class="p-datatable-sm my_table" showGridlines scrollable scrollHeight="400px">
    <Column field="name" header="Названия" style="min-width: 100px" class="font-bold my_column"></Column>
    <!-- <Column field="floor_count" header="Этажность" style="min-width: 50px"></Column> -->
    <Column field="address" header="Адрес" style="min-width: 200px"></Column>
    <Column field="floor_count" header="Balance" style="min-width: 100px">
        <template #body="{ data }">
            <span class="my_column"  @click="show">111</span>
        </template>
    </Column>
    <!-- <Column field="name" header="Name" style="min-width: 200px"></Column>
    <Column field="country.name" header="Country" style="min-width: 200px"></Column>
    <Column field="date" header="Date" style="min-width: 200px"></Column>
    <Column field="company" header="Company" style="min-width: 200px"></Column>
    <Column field="status" header="Status" style="min-width: 200px"></Column>
    <Column field="activity" header="Activity" style="min-width: 200px"></Column>
    <Column field="representative.name" header="Representative" style="min-width: 200px"></Column>
     -->
</DataTable>
</template>

<style scoped>
.my_table {
    width: 700px;
    margin: 0 auto;
}

.p-datatable-tbody > tr > td {
    text-align: center !important;
    color: red;
}


</style>