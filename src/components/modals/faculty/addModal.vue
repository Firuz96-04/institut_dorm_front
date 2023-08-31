<script setup>
import { useFacultyStore } from '@/store/faculty';
import {defineEmits, ref} from 'vue'
const facultyStore = useFacultyStore()


const emits = defineEmits({
    close: null
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


    <InputText v-model="faculty.name" placeholder="Search" />
    <Button type="submit" label="Добавить" />
    </form>
  </Dialog>
</template>

