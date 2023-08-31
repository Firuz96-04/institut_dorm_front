<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useRoomStore } from '@/store/room';
import { useRoomTypeStore } from '@/store/room_type';
import { useBuildingStore } from '@/store/building';


const buildStore = useBuildingStore()
const roomTypeStore = useRoomTypeStore()
const roomStore = useRoomStore()

roomTypeStore.setAllRoomType()
const buildings = computed(() => buildStore.allBuilding)
const roomtypes = computed(() => roomTypeStore.getAllRoomType)

const emits = defineEmits({
    close: null
});
const visible = ref(false);

const closeModal = () => {
    roomState.number = null
    roomState.building = null
    roomState.floor = null
    roomState.floor_count = null
    roomState.description = ''
    emits('close');
};

const isFloor = ref(true)
const roomState = ref({
    number: null,
    building: null,
    floor: null,
    room_type: null,
    description: ''

})

const floors = ref([])

const addHandle = () => {
    roomStore.addRoom({
        room: roomState.value,
        cb: closeModal
    })
        console.log(roomState.value, 'lll');
};

const buildHandle  = (e) => {
    if (e.value) {
        isFloor.value = false
        const build = buildings.value.filter(item => item.id == e.value)
        const res = JSON.parse(JSON.stringify(build))
        const floor = res[0].floor_count
        floors.value = []
        for (let i = 1; i <= floor; i++) {
            floors.value.push({name: i, id: i})
            }
    }
    else {
        console.log('nut');
        roomState.value.floor = null
        isFloor.value = true
    
    }
}

</script>
<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Добавить комнату" :style="{ width: '25vw' }">
        <form @submit.prevent="addHandle">
            <br />
            <div class="flex flex-column align-items-center justify-content-center text-justify">
                    <span class="p-float-label font-medium mb-4">
                        <InputText id="room" 
                            v-model="roomState.number" 
                            type="search" 
                            size="small" 
                            :maxlength="4"
                            class="text-lg md:w-16rem py-2" />
                        <label for="room">Комната</label>
                    </span>
                    <span class="p-float-label font-medium mb-4">
                        <Dropdown v-model="roomState.building"
                            :options="buildings.map((item) => ({name: item.name, code: item.id}))"
                            optionLabel="name"
                            optionValue="code"
                            showClear
                            id="building"
                            size="small"
                            @change="buildHandle"
                            class="md:w-16rem p-0 my_dropdown" />
                        <label for="building">Здания</label>
                    </span>
                    <span class="p-float-label font-medium mb-4">
                        <Dropdown 
                            v-model="roomState.floor"
                            :options="floors.map(item => ({name: item.name, id: item.id}) )"
                            :disabled="isFloor"
                            optionLabel="name"
                            optionValue="id"
                            showClear
                            id="floor"
                            size="small"
                            class="md:w-16rem my_dropdown" />
                        <label for="floor">Этаж</label>
                    </span>

                    <span class="p-float-label font-medium mb-4">
                        <Dropdown 
                            v-model="roomState.room_type"
                            :options="roomtypes.map((item) => ({name: item.place, id: item.id}))"
                            optionLabel="name"
                            optionValue="id"
                            showClear
                            id="room_type"
                            size="small"
                            class="md:w-16rem my_dropdown" />
                        <label for="room_type">Тип комнаты</label>
                    </span>

                    <span class="p-float-label font-medium mb-4">
                        <Textarea v-model="roomState.description" type="text" showClear class="text-lg md:w-16rem py-2" rows="5" cols="25" />
                        <label>Описания</label>
                    </span>
                <Button type="submit" label="Submit" size="small" />
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