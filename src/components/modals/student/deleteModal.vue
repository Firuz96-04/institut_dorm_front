<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useStudentStore } from '@/store/student';

const props = defineProps({
    visible: {
        type: Boolean,
        reqiured: true
    },
    student: {
        type: Object,
        reqiured: false
    }
});

const emit = defineEmits({
    close: null
});

const deleteHandle = () => {
    console.log('delete');
}

const closeModal = () => {
    emit('close');
};
</script>
<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Удалить Студента" :style="{ width: '20vw' }">
        <!-- {{ student }} -->
        <p class="font-medium text-lg">Вы хотите удалить {{ student?.name }}</p>
        <div class="flex flex-row-reverse">
            <Button label="Удалить" @click="deleteHandle" class="text-base py-2 px-3" size="small" severity="danger"/>
        </div>
    </Dialog>
</template>

<style lang="scss" scoped></style>
