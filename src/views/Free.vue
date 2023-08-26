<script setup>
import { computed, ref } from 'vue';
import { useFreePlaceStore } from '@/store/free_place';
import { useBuildingStore } from '@/store/building';
import freeModal from '@/components/modals/free/freeModal.vue';
const freeStore = useFreePlaceStore();
const buildStore = useBuildingStore()

const freeFilter = ({
    building: null,
    floor: null,
    is_full: null
})
const freeData = ref({});
freeStore.setAllFreePlace();

const visible = ref(false);

const selectedCity = ref(null);

const buildHandle = (e) => {
    const {code} = e.value
    const floor = JSON.parse(JSON.stringify(buildStore))
    console.log(floor, 'eee');
    console.log(code);
        // console.log(e.value, 'event');
}

const freePlace = (obj) => {
    console.log(obj);
    freeData.value = JSON.parse(JSON.stringify(obj));
    visible.value = true;
};
const close = () => {
    visible.value = false;
};
const free_places = computed(() => freeStore.getAllFreePlace);
const buildings = computed(() => buildStore.allBuilding)
</script>
<template>
    <div class="card my_card">
        <DataTable :value="free_places" class="p-datatable-sm my-table" showGridlines tableStyle="min-width: 40rem">
            <Column field="building" header="Здания" style="min-width: 150px"></Column>
            <Column field="number" headerClass="column-text-center" header="Комната" style="min-width: 60px; text-align: center"></Column>
            <Column field="floor" headerClass="column-text-center" header="Этаж" style="min-width: 50px"></Column>
            <Column field="room_place" headerClass="column-text-center" header="Тип комнаты" style="width: 150px"></Column>

            <Column field="person_count" headerClass="column-text-center" header="Кол. проживаюших" style="width: 150px"></Column>
            <Column field="free_place" headerStyle="text-align:center" header="Свободные места" bodyClass="text-center" class="width:150px"></Column>
            <Column field="action" header="!!!" headerClass="column-text-center" style="min-width: 100px; text-align: center">
                <template #body="{ data }">
                    <!-- <Button size="small" label="Success" severity="success" raised /> -->
                    <!-- <Button v-if="data.is_full" label="занято"  text  raised  class="my_btn" /> -->
                    <Button v-if="data.is_full" label="занято" severity="danger" raised class="my_btn" />
                    <Button v-else label="свободно" @click="freePlace(data)" severity="success" class="my_btn" raised />
                </template>
            </Column>
            <template #header>
                <div>
                    <Dropdown v-model="freeFilter.building" @change="buildHandle" optionLabel="name" :options="buildings.map((item) => ({ name: item.name, code: item.id }))" placeholder="Здания" class="p-inputtext-sm w-full md:w-12rem" />       
                    <Dropdown v-model="freeFilter.building" :options="buildings.map((item) => ({ name: item.name, code: item.id }))" placeholder="Здания" class="p-inputtext-sm w-full md:w-12rem" />       
                </div>
            </template>
            <template #footer> </template>
        </DataTable>
        <Teleport to="body">
            <freeModal @close="close" :visible="visible" :data.sync="freeData"></freeModal>
        </Teleport>
    </div>
</template>

<style lang="scss">
.my_card {
    padding: 1rem;
}
.my_btn {
    padding: 4px 8px;
    width: 90px;
    // color: #d123b4 !important;
    font-size: 12px;
    // background-color: rgb(183, 238, 170) !important;
    border: none;

    // &:hover {
    //     background-color: #b93c3c !important;
    // }
}

.column-text-center {
    .p-column-header-content {
        text-align: center; // or center
        display: block !important;
    }
}
//   .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td
.my-table {
    .p-datatable-tbody > tr > td {
        padding: 0.3rem !important;
    }
}
</style>
