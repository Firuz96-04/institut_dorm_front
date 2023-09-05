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

const rooms = computed(() => roomStore.getAllRoom);
const buildings = computed(() => buildStore.allBuilding);

const room_filter = ref({
    room: null,
    building: null
});

const isAdd = ref(false);
const isEdit = ref(false);
const isDelete = ref(false)
const room = ref({});

const editHandle = (data) => {
    room.value = JSON.parse(JSON.stringify(data));
    isEdit.value = true;
};

const deleteHandle = (data) => {
    isDelete.value = true
    room.value = JSON.parse(JSON.stringify(data))
};

const addHandle = () => {
    isAdd.value = true;
    console.log('addHandle');
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
</script>
<template>
    <div class="card room_card">
        <DataTable :value="rooms" class="p-datatable-sm" scrollHeight="400px" scrollable showGridlines tableStyle="min-width: 40rem">
            <ColumnGroup type="header">
                <Row>
                    <Column header="#" :rowspan="2" />
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
            <Column headerStyle="width:3rem" style="width: 50px" header="#" frozen>
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="number" class="text-center" style="min-width: 150px"></Column>
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
                        <InputText v-model="room_filter.room" @update:modelValue="searchRoom" class="my_input w-full md:w-8rem" type="search" size="small" :maxlength="4" placeholder="комната" />
                        <Dropdown
                            v-model="room_filter.building"
                            :options="buildings.map((item) => ({ name: item.name, code: item.id }))"
                            @change="filterHandle"
                            showClear
                            optionLabel="name"
                            optionValue="code"
                            placeholder="Select a City"
                            class="w-full md:w-12rem my_dropdown"
                            size="small"
                        />
                    </div>
                    <div>
                        <Button label="Добавить" @click="addHandle" severity="secondary" size="small" text raised />
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
    <Teleport to="body">
        <addRoom :visible="isAdd" @close="closeModal" />
        <editRoom :visible="isEdit" @close="closeModal" :room="room" />
        <deleteRoom :visible="isDelete" @close="closeModal" :room="room"/>
    </Teleport>
</template>

<style lang="scss" scoped>
.room_card {
    padding: 1rem;
}

.my_dropdown {
    .p-inputtext {
        padding: 0.5rem 0.5rem !important;
    }
}
.header_block {
    display: flex;
    justify-content: space-between;

    &__filter {
    }
}
</style>
