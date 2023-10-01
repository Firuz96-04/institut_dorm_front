<script setup>
import {ref, defineEmits} from 'vue'
import { usePriviligeStore } from '@/store/privilige';

const priviligeStore = usePriviligeStore()

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

const privilige = ref({
    name: '',
    description: ''
})
const closeModal = () => {
    emits('close')
    privilige.value.name = ''
    privilige.value.description = ''
}


const addPrivilige = () => {
    priviligeStore.addPrivilige({
        privilige: privilige.value,
        cb: closeModal
    })
}
</script>

<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Добавить Привилегию" :style="{ width: '30vw' }">
        <form @submit.prevent="addPrivilige">
            <div class="p-fluid">
                <div class="field grid mt-1">
                    <label for="name" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Названия</label>
                    <div class="col-12 md:col-9 ml-4">
                        <InputText id="name" v-model="privilige.name" class="text-base" type="search" :maxlength="40" size="small" />
                    </div>
                </div>
                <div class="field grid">
                    <label for="description" class="col-12 mb-2 md:col-2 md:mb-0 font-medium">Описания</label>
                    <div class="col-12 md:col-9 ml-4">
                        <Textarea v-model="privilige.description" class="text-base" :maxlength="100" id="description" rows="5" cols="30" size="small" />
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
