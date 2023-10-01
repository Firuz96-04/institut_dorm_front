<script setup>
import {ref, defineEmits, watch} from 'vue'
import { useBuildingStore } from '@/store/building';

const buildStore = useBuildingStore()

const emits = defineEmits({
    close: null
})
const props = defineProps({
    visible:{
        type: Boolean,
        default:false,
        required: true
    },
    building: {
        type: Object,
        default: {}
    }
})

const edit_building = ref(null)
const floors = [1,2,3,4,5,6]

watch(
  () => props.building,
  (building) => {
    console.log(building);
    const data = JSON.parse(JSON.stringify(building))
    edit_building.value = data
  }
)


const closeModal = () => {
    emits('close')
}


const editBuilding = () => {
    buildStore.editBuilding({
        building: edit_building.value,
        cb: closeModal
    })
}
</script>

<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Добавить Здания" :style="{ width: '25vw' }">
        <form @submit.prevent="editBuilding">
            <div class="p-fluid">
                <div class="field grid mt-1">
                    <label for="name" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Здания</label>
                    <div class="col-12 md:col-9 ml-4">
                        <InputText id="name" class="text-base" v-model="edit_building.name" type="search" :maxlength="25" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="floor_count" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Этажность</label>
                    <div class="col-12 md:col-4 ml-4">
                        <Dropdown v-model="edit_building.floor_count" :options="floors.map((item) => ({ name: item, code: item }))" id="floor_count" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid mt-1">
                    <label for="address" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Адрес</label>
                    <div class="col-12 md:col-9 ml-4">
                        <InputText id="address" v-model="edit_building.address" type="search" :maxlength="35" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="principal" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Комендант</label>
                    <div class="col-12 md:col-9 ml-4">
                        <Dropdown v-model="edit_building.principal" :options="floors.map((item) => ({ name: item, code: item }))" id="principal" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="description" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Описания</label>
                    <div class="col-12 md:col-9 ml-4">
                        <Textarea v-model="edit_building.description" id="description" rows="5" cols="30" size="small" />
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
