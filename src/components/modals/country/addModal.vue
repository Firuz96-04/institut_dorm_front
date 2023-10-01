<script setup>
import {ref, defineEmits} from 'vue'
import { useCountryStore } from '@/store/country';

const countryStore = useCountryStore()

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
// const visible = ref(false)

const country = ref({
    name: null
})
const closeModal = () => {
    emits('close')
    country.value.name = null

}


const addCountry = () => {
    countryStore.addCountry({
        country: country.value,
        cb: closeModal
    })
}
</script>

<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Добавить страну" :style="{ width: '25vw' }">
        <form @submit.prevent="addCountry">
            <div class="flex flex-column align-items-center justify-content-center text-justify">
                <div class="col-8 p-0 mb-2">
                    <label class="text-lg font-medium mb-1" for="building">Страна</label>
                    <div>
                        <InputText id="building" class="text-base mt-1 min-w-full" placeholder="Страна" :maxlength="20" size="small" type="search" v-model="country.name" />
                    </div>
                </div>
                <div class="col-8 p-0 mb-2">
                    <Button type="submit" class="min-w-full p-2 text-base" size="small" label="Добавить" />
                </div>
            </div>
        </form>
    </Dialog>
</template>
