<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useRoomStore } from '@/store/room';
import { useRoomTypeStore } from '@/store/room_type';
import { useBuildingStore } from '@/store/building';

const buildStore = useBuildingStore();
const roomTypeStore = useRoomTypeStore();
const roomStore = useRoomStore();

const buildings = computed(() => buildStore.allBuilding);
const roomtypes = computed(() => roomTypeStore.getAllRoomType);

const emits = defineEmits({
    close: null
});
const visible = ref(false);
const floors = ref([]);
const isFloor = ref(true);
const roomState = ref({
    number: null,
    building: null,
    floor: null,
    room_type: null,
    description: ''
});

const closeModal = () => {
    roomState.value.number = null;
    roomState.value.building = null;
    roomState.value.floor = null;
    roomState.value.room_type = null;
    roomState.value.floor_count = null;
    roomState.value.description = '';
    emits('close');
};

const addHandle = () => {
    roomStore.addRoom({
        room: roomState.value,
        cb: closeModal
    });
    console.log(roomState.value, 'lll');
};

const buildHandle = (e) => {
    if (e.value) {
        isFloor.value = false;
        const build = buildings.value.filter((item) => item.id == e.value);
        const res = JSON.parse(JSON.stringify(build));
        const floor = res[0].floor_count;
        floors.value = [];
        for (let i = 1; i <= floor; i++) {
            floors.value.push({ name: i, id: i });
        }
    } else {
        console.log('nut');
        roomState.value.floor = null;
        isFloor.value = true;
    }
};
</script>
<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Добавить комнату" :style="{ width: '25vw' }">
        <form @submit.prevent="addHandle">
            <div class="p-fluid">
                <div class="field grid mt-1">
                    <label for="number" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Комната</label>
                    <div class="col-12 md:col-5 ml-4">
                        <InputText id="number" class="text-base" v-model="roomState.number" type="search" :maxlength="4" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="building" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Здания</label>
                    <div class="col-12 md:col-9 ml-4">
                        <Dropdown v-model="roomState.building" :options="buildings.map((item) => ({ name: item.name, code: item.id }))" id="building" showClear optionLabel="name" @change="buildHandle" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="floor" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Этаж</label>
                    <div class="col-12 md:col-5 ml-4">
                        <Dropdown v-model="roomState.floor" :disabled="isFloor" :options="floors.map((item) => ({ name: item.name, code: item.id }))" id="floor" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="room_type" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Тип комнаты</label>
                    <div class="col-12 md:col-5 ml-4">
                        <Dropdown v-model="roomState.room_type" :options="roomtypes.map((item) => ({ name: item.place, code: item.id }))" id="room_type" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="description" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Описания</label>
                    <div class="col-12 md:col-9 ml-4">
                        <Textarea v-model="roomState.description" id="description" rows="5" cols="30" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <div class="col-12">
                        <Button type="submit" label="Добавить" size="small" />
                    </div>
                </div>
            </div>
        </form>
    </Dialog>
</template>

<style lang="scss" scoped>
.my_dropdown {
    .p-inputtext {
        padding: 0.4rem 0.4rem !important;
    }
}
</style>
