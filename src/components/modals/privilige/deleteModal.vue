<script setup>
import {ref, defineEmits, defineProps} from 'vue'
import { usePriviligeStore } from '@/store/privilige';

const priviligeStore = usePriviligeStore()

const emits = defineEmits({
    close: null
})
const props = defineProps({
    privilige: {
        type: Object,
        required:true,
    },
    visible:{
        type: Boolean,
        default:false,
        required: true
    }
})



const deleteHandle = () => {
    priviligeStore.deletePrivilige({
        privilige: props.privilige.id,
        cb: closeModal
    })
    console.log('delete');
}

const closeModal = () => {
    emits('close');
};

</script>

<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Удалить привилегию" :style="{ width: '20vw' }">
        <p class="font-medium text-lg">Вы хотите удалить {{ privilige?.name }}</p>
        <div class="flex flex-row-reverse">
            <Button label="Удалить" @click="deleteHandle" class="text-base py-2 px-3" size="small" severity="danger"/>
        </div>
    </Dialog>
</template>

<style lang="scss" scoped></style>
