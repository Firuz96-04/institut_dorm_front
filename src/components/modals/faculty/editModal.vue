<script setup>
import { useFacultyStore } from '@/store/faculty';
import { defineEmits, defineProps, ref } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const facultyStore = useFacultyStore();

const emits = defineEmits({
    close: null
});

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
const visible = ref(false);


const closeModal = () => emits('close');



const addFaculty = () => {
    const parse = JSON.parse(JSON.stringify(props.item))
    facultyStore.facultyEdit({
        faculty: parse,
        cb: closeModal
    });
};
</script>
<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Редактировать факультет" :style="{ width: '20vw' }">
        <form @submit.prevent="addFaculty">
            <div class="flex flex-column align-items-center justify-content-center text-justify">
                <div class="col-8 p-0 mb-2">
                    <label class="text-lg font-medium mb-1" for="building">Факультет</label>
                    <div>
                        <InputText id="building" class="text-base mt-1 min-w-full" placeholder="Факультет" :maxlength="20" size="small" type="search" v-model="item.name" />
                    </div>
                </div>
                <div class="col-8 p-0 mb-2">
                    <Button type="submit" class="min-w-full p-2 text-base" size="small" label="Редактировать" />
                </div>
            </div>
        </form>
    </Dialog>
</template>
