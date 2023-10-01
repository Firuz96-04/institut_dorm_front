<script setup>
import { computed, ref } from 'vue';
import { useRoomStore } from '@/store/room';
import { useBuildingStore } from '@/store/building';
import { useRoomTypeStore } from '@/store/room_type';
import addRoom from '@/components/modals/room/addRoom.vue';
import editRoom from '@/components/modals/room/editRoom.vue';
import deleteRoom from '@/components/modals/room/deleteRoom.vue';


const buildStore = useBuildingStore();
const roomStore = useRoomStore();
const roomTypeStore = useRoomTypeStore()

let timeout;
roomStore.setAllRoom();
buildStore.setAllBuilding();

roomTypeStore.setAllRoomType()

const loading = computed(() => roomStore.loading)
const rooms = computed(() => roomStore.getAllRoom);
const pagination = computed(() => roomStore.getAllPagination)
const buildings = computed(() => buildStore.allBuilding);

const room_filter = ref({
    room: null,
    building: null,
    gender: null
});

const isAdd = ref(false);
const isEdit = ref(false);
const isDelete = ref(false)
const roomEdit = ref({});
const roomDelete = ref({});

const selectedProduct = ref([])

const editHandle = (data) => {
    roomEdit.value = JSON.parse(JSON.stringify(data));
    isEdit.value = true;
};

const deleteHandle = (data) => {
    roomDelete.value = JSON.parse(JSON.stringify(data))
    isDelete.value = true
};

const addHandle = () => {
    isAdd.value = true;
};

const filterHandle = (e) => {
    roomStore.setAllRoom(room_filter.value);
};

const searchRoom = (e) => {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    timeout = setTimeout(() => {
        roomStore.setAllRoom(room_filter.value);
    }, 500);
};

const closeModal = () => {
    isAdd.value = false;
    isEdit.value = false;
    isDelete.value = false
};

const paginateHandle = (data) => {
    console.log(data);
}

const roomGenderList = [
    {name:'женские', code: 0},
    {name:'мужские', code: 1},
    {name:'незаселенные', code: 2},
]

</script>
<template>
    <div class="card" style="padding: 1rem">
        <DataTable v-model:selection="selectedProduct" :value="rooms"
        :loading="loading"
        class="p-datatable-sm my-table" scrollHeight="calc(100vh - 250px)"
        scrollable showGridlines tableStyle="min-width: 40rem">
            <ColumnGroup type="header">
                <Row>
                    <Column header="#" :rowspan="2" class="column-text-center"/>
                    <Column selectionMode="multiple" class="column-text-center"  headerStyle="width: 2rem" :rowspan="2"></Column>
                    <Column header="Комната" headerClass="font-medium" class="column-text-center" :rowspan="2" />
                    <Column header="Этаж" headerClass="font-medium" class="column-text-center" :rowspan="2" />
                    <Column header="Тип комнаты" headerClass="font-medium" class="column-text-center" :rowspan="2" />
                    <Column header="Здания" headerClass="font-medium" class="column-text-center" :colspan="2" />
                    <Column header="!!!" class="column-text-center" :rowspan="2" />
                </Row>
                <Row>
                    <Column header="Названия" headerClass="font-medium" class="column-text-center" field="building_name" />
                    <Column header="Этажность" headerClass="font-medium" class="column-text-center" field="building_floor_count" />
                </Row>
            </ColumnGroup>
            <Column headerStyle="width:2rem" class="text-center" header="#" frozen>
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column selectionMode="multiple" class="text-center" headerStyle="width: 3rem"></Column>
            <Column field="number" class="text-center" style="min-width: 150px;"></Column>
            <Column field="floor" class="text-center" style="min-width: 100px"></Column>
            <Column field="room_type.place" class="text-center" style="min-width: 100px"></Column>
            <Column field="building_name" class="text-center" style="min-width: 150px"></Column>
            <Column field="room_type.place" class="text-center" style="min-width: 100px"></Column>
            <Column field="actions" header="!!!" style="width: 80px">
                <template #body="{ data }">
                    <div class="action_style">
                        <vue-icon class="action_style__edit" @click="editHandle(data)" icon="fa-solid fa-pen-to-square" />
                        <vue-icon class="action_style__delete" @click="deleteHandle(data)" icon="fa-solid fa-trash-can" />
                    </div>
                </template>
            </Column>
            <template #header>
                <div class="header_block">
                    <div class="header_block__filter">
                        <InputText v-model="room_filter.room" @update:modelValue="searchRoom" class="my_input w-full md:w-8rem text-base" type="search" size="small" :maxlength="4" placeholder="комната" />
                        <Dropdown
                            v-model="room_filter.building"
                            :options="buildings.map((item) => ({ name: item.name, code: item.id }))"
                            @change="filterHandle"
                            showClear
                            optionLabel="name"
                            optionValue="code"
                            placeholder="Здания"
                            class="st_select w-full md:w-12rem ml-4"
                            size="small"    
                        />
                        <Dropdown
                            v-model="room_filter.gender"
                            :options="roomGenderList"
                            @change="filterHandle"
                            showClear
                            optionLabel="name"
                            optionValue="code"
                            placeholder="тип комната"
                            class="st_select w-full md:w-14rem ml-4"
                            size="small"  
                        />
                    </div>
                    <div>
                        <Button label="Добавить" @click="addHandle" size="small" raised />
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="main_footer">
                    <div class="main_footer__pagination">
                        <Paginator class="custom_pagination" :alwaysShow="false" @page="paginateHandle" :rows="pagination.page_size" :totalRecords="pagination.total"></Paginator>
                    </div>
                    <div class="main_footer__export">
                        <Button class="py-1 px-2 my_icon" icon="pi pi-file-excel" severity="success" label="Excel" aria-label="Submit" />
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
    <Teleport to="body">
        <addRoom :visible="isAdd" @close="closeModal" />
        <editRoom :visible="isEdit" @close="closeModal" :room="roomEdit" />
        <deleteRoom :visible="isDelete" @close="closeModal" :room="roomDelete"/>
    </Teleport>
</template>

<style lang="scss" scoped>
.st_select {
    .p-inputtext {
        padding: 0.5rem 0.5rem !important;
    }
    ul {
    .p-dropdown-panel {
        padding: 0.1rem !important;
        color: red !important;
    } 
    }
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
.header_block {
    display: flex;
    justify-content: space-between;

}

</style>
