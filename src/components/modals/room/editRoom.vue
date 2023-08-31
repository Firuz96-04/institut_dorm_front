<script setup>
import {ref, computed, defineEmits, defineProps} from 'vue'
import { useRoomStore } from '@/store/room';
import { useBuildingStore } from '@/store/building';

const emits = defineEmits({
    close: null
})

const buildStore = useBuildingStore()

const props = defineProps({
    room: {
        type: Object,
        required: false
    }
})
const visible = ref(false)

const closeModal = () => {
    emits('close')
}
const editHandle = () => {
    const roomData = JSON.parse(JSON.stringify(props.room))
    console.log(roomData, 'room data');
}

const buildings = computed(() => buildStore.allBuilding)

</script>
<template>

<Dialog :visible="visible" @update:visible="closeModal" modal header="Редактировать комнату" :style="{ width: '30vw' }">
    <form @submit.prevent="editHandle">
        <p>
            {{ room }}
        </p>
        <Dropdown v-model="room.building" editable 
        :options="buildings.map((item) => ({name: item.name, code: item.id}))" 
        optionLabel="name"
        optionValue="code"
        placeholder="Select a City" class="w-full md:w-14rem" />

        <Button type="submit" label="редактировать" />
    </form>
</Dialog>
    
</template>