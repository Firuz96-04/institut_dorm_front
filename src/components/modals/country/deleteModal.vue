<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useCountryStore } from '@/store/country';

const props = defineProps({
    visible: {
        type: Boolean,
        reqiured: true
    },
    country: {
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
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Удалить страну" :style="{ width: '20vw' }">
        <p class="font-medium text-lg">Вы хотите удалить {{ country?.name }}</p>
        <div class="flex flex-row-reverse">
            <Button label="Удалить" @click="deleteHandle" class="text-base py-2 px-3" size="small" severity="danger"/>
        </div>
    </Dialog>
</template>

<style lang="scss" scoped></style>
