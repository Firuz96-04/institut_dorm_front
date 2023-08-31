<script setup>
import { useFacultyStore } from '@/store/faculty';
import {defineEmits, defineProps, ref} from 'vue'
const facultyStore = useFacultyStore()


const emits = defineEmits({
    close: null
})

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})
const visible = ref(false)
const faculty = ref({
    name: null
})

const closeModal = () => {
  faculty.value.name = null
  emits('close')
}
const addFaculty = () => {
  facultyStore.addFaculty({
    faculty: faculty.value,
    cb: closeModal
  })
}

</script>
<template>
  <Dialog :visible="visible" @update:visible="closeModal" modal header="Добавить факультет" :style="{ width: '25vw' }">
    <form @submit.prevent="addFaculty">
        {{ item }}

    <InputText v-model="item.name" placeholder="Search" />
    <Button type="submit" label="Добавить" />
    </form>
  </Dialog>
</template>

