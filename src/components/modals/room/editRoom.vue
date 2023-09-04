<script setup>
import {ref, computed, defineEmits, onMounted, defineProps, watch} from 'vue'
import { useRoomStore } from '@/store/room';
import { useBuildingStore } from '@/store/building';
import { useRoomTypeStore } from '@/store/room_type';

const roomTypeStore = useRoomTypeStore()
const buildStore = useBuildingStore()
const roomStore = useRoomStore()

const emits = defineEmits({
    close: null
})

const props = defineProps({
    room: {
        type: Object,
        required: false
    }
})
const floors = ref([])
const visible = ref(false)
const isFloor = ref(false)
const closeModal = () => emits('close')

const buildings = computed(() => buildStore.allBuilding)
const roomtypes = computed(() => roomTypeStore.getAllRoomType)
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
        roomState.value.floor = null
        isFloor.value = true
    }
}

watch(  () => props.room,
  (data) => {
    console.log('watch');
    const room = JSON.parse(JSON.stringify(data))
    const build = buildings.value.filter(item => item.id == room.building)
    const floor = build[0].floor_count
    floors.value = []
        for (let i = 1; i <= floor; i++) {
            floors.value.push({name: i, id: i})
            }
  })

const editHandle = () => {
    const roomData = JSON.parse(JSON.stringify(props.room))
    const room_type = roomData.room_type.id
    // console.log(roomData, 'roomData');
    roomStore.roomEdit({
        room: {...roomData, room_type},
        cb: closeModal
    })
}

</script>
<template>

<Dialog :visible="visible" @update:visible="closeModal" modal header="Редактировать комнату" :style="{ width: '25vw' }">
    <form @submit.prevent="editHandle">
        <div class="p-fluid">
                <div class="field grid mt-1">
                    <label for="number" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Комната</label>
                    <div class="col-12 md:col-5 ml-4">
                        <InputText id="number" v-model="room.number" type="search" :maxlength="4" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="building" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Здания</label>
                    <div class="col-12 md:col-9 ml-4">
                        <Dropdown v-model="room.building" :options="buildings.map(item => ({name: item.name, code: item.id}))"
                         id="building" showClear optionLabel="name" @change="buildHandle" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="floor" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Этаж</label>
                    <div class="col-12 md:col-5 ml-4">
                        <Dropdown v-model="room.floor" 
                        :disabled="isFloor"
                        :options="floors.map(item => ({name: item.name, code: item.id}))"
                         id="floor" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="room_type" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Тип комнаты</label>
                    <div class="col-12 md:col-5 ml-4">
                        <Dropdown v-model="room.room_type.id" :options="roomtypes.map(item => ({name: item.place, code: item.id}))"
                         id="room_type" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>              
                <div class="field grid">
                    <label for="description" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Описания</label>
                    <div class="col-12 md:col-9 ml-4">
                        <Textarea v-model="room.description" id="description" rows="5" cols="30" size="small" />
                     </div>
                </div>
                <div class="field grid">
                    <div class="col-12">
                        <Button type="submit" label="Редактировать" size="small" />
                    </div>
                </div>

            </div>

    </form>
</Dialog>
    
</template>