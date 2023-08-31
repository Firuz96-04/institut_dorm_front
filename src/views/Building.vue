<script setup>
import { computed } from 'vue';
import { useBuildingStore } from '@/store/building';

const buildingStore = useBuildingStore();
buildingStore.setAllBuilding();

const buildings = computed(() => buildingStore.allBuilding);


const deleteHandle = () => {

}

const editHandle = (data) => {

}
const show = () => {
    console.log('kkk');
}
</script>
<template>
    <div class="card my_table">
<DataTable :value="buildings" class="p-datatable-sm " showGridlines scrollable scrollHeight="400px">
    <Column field="name" header="Названия" style="width: 25%" class="font-bold my_column"></Column>
    <Column field="floor_count" header="Этажность" style="width: 15%">
        <template #body="{ data }">
            <span class="my_column"  @click="show">{{ data.floor_count }}</span>
        </template>
    </Column>
    <Column field="address" header="Адрес" style="width: 50%"></Column>
    <Column field="actions" header="!!!" style="width: 80px">
                <template #body="{data}"> 
                    <div class="action_style">
                        <vue-icon class="action_style__edit" @click="editHandle(data)" icon="fa-solid fa-pen-to-square" />
                        <vue-icon class="action_style__delete" @click="deleteHandle" icon="fa-solid fa-trash-can" />
                    </div>
                </template>
            </Column>
</DataTable>
</div>
</template>

<style scoped>
.my_table {
    width: 850px;
    margin: 0 auto;
}

.p-datatable-tbody > tr > td {
    text-align: center !important;
    color: red;
}


</style>