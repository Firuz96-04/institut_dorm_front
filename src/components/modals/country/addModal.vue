<script setup>
import {ref, defineEmits} from 'vue'
import { useCountryStore } from '@/store/country';

const countryStore = useCountryStore()

const emits = defineEmits({
    close: null
})
const visible = ref(false)

const country = ref({
    name: null
})
const closeModal = () => emits('close')

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


    <InputText v-model="country.name" placeholder="Search" />
    <Button type="submit" label="Submit" />
    </form>
  </Dialog>
</template>
