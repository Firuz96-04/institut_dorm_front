<script setup>
import {ref, defineEmits} from 'vue'
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
    }
})

const floors = [1,2,3,4,5,6]
const building = ref({
    name: '',
    floor_count: null,
    address: '',
    principal: null,
    description: ''
})
const closeModal = () => {
    emits('close')
    building.value.name = ''
    building.value.floor_count = null
    building.value.address = ''
    building.value.principal = null
    building.value.description = ''
}


const addBuilding = () => {
    buildStore.addBuilding({
        building: building.value,
        cb: closeModal
    })
}
</script>

<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Добавить Здания" :style="{ width: '25vw' }">
        <form @submit.prevent="addBuilding">
            <div class="p-fluid">
                <div class="field grid mt-1">
                    <label for="name" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Здания</label>
                    <div class="col-12 md:col-9 ml-4">
                        <InputText id="name" v-model="building.name" class="text-base" type="search" :maxlength="25" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="floor_count" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Этажность</label>
                    <div class="col-12 md:col-4 ml-4">
                        <Dropdown v-model="building.floor_count" :options="floors.map((item) => ({ name: item, code: item }))" id="floor_count" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid mt-1">
                    <label for="address" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Адрес</label>
                    <div class="col-12 md:col-9 ml-4">
                        <InputText id="address" class="text-base" v-model="building.address" type="search" :maxlength="35" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="principal" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Комендант</label>
                    <div class="col-12 md:col-9 ml-4">
                        <Dropdown v-model="building.principal" :options="floors.map((item) => ({ name: item, code: item }))" id="principal" showClear optionLabel="name" optionValue="code" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="description" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Описания</label>
                    <div class="col-12 md:col-9 ml-4">
                        <Textarea v-model="building.description" class="text-base" id="description" rows="5" cols="30" size="small" />
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
