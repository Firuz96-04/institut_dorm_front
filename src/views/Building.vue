<script setup>
import { computed } from 'vue';
import { useBuildingStore } from '@/store/building';

const buildingStore = useBuildingStore();
buildingStore.setAllBuilding();

const buildings = computed(() => buildingStore.allBuilding);

const deleteHandle = () => {};

const addHandle = (data) => {};

</script>
<template>
    <div class="card my_table">
        <DataTable :value="buildings" class="p-datatable-sm" showGridlines scrollable scrollHeight="400px">
            <Column header="#" headerStyle="width:4rem">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="name" headerClass="font-semibold column-text-center" header="Названия" style="width: 25%" ></Column>
            <Column field="floor_count" header="Этажность" headerClass="font-semibold column-text-center" class="text-center" style="width: 15%">
                <template #body="{ data }">
                    <span class="my_column" @click="show">{{ data.floor_count }}</span>
                </template>
            </Column>
            <Column field="address" headerClass="font-semibold column-text-center" header="Адрес" style="width: 50%"></Column>
            <Column field="actions" header="!!!" headerClass="column-text-center" style="min-width: 90px">
                <template #body="{ data }">
                    <div class="action_style">
                        <vue-icon class="action_style__edit" @click="editHandle(data)" icon="fa-solid fa-pen-to-square" />
                        <vue-icon class="action_style__delete" @click="deleteHandle" icon="fa-solid fa-trash-can" />
                    </div>
                </template>
            </Column>
            <template #header>
                <div class="student_header">
                    <div>
                        <Button label="Добавить" @click="addHandle" size="small" raised />
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="main_footer">
                    <div class="main_footer__pagination"></div>
                    <div class="main_footer__export">
                        <Button class="py-1 px-2 my_icon" icon="pi pi-file-excel" severity="success" label="Excel" aria-label="Submit" />
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<style scoped>

.student_header {
    display: flex;
    justify-content: end;

}
.my_table {
    width: 850px;
    margin: 0 auto;
    padding: 1rem;
}

.p-datatable-tbody > tr > td {
    text-align: center !important;
    color: red;
}
.my_icon {
    .pi {
        font-size: 1.3rem !important;
    }
}
.main_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
