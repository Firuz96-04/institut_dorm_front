<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useFacultyStore } from '@/store/faculty';

const props = defineProps({
    visible: {
        type: Boolean,
        reqiured: true
    },
    faculty: {
        type: Object,
        reqiured: false
    }
});

const emit = defineEmits({
    close: null
});

const deleteHandle = () => {
    console.log('delete');
};

const closeModal = () => {
    emit('close');
};
</script>

<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Удалить факультет" :style="{ width: '20vw' }">
        <p class="font-medium text-lg">Вы хотите удалить {{ faculty?.name }}</p>
        <div class="flex flex-row-reverse">
            <Button label="Удалить" @click="deleteHandle" class="text-base py-2 px-3" size="small" severity="danger" />
        </div>
    </Dialog>
</template>

<style lang="scss" scoped></style>
