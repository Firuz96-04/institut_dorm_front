<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useBuildingStore } from '@/store/building';

const props = defineProps({
    visible: {
        type: Boolean,
        reqiured: true
    },
    building: {
        type: Object,
        reqiured: false
    }
});
const buildStore = useBuildingStore()

const emit = defineEmits({
    close: null
});



const closeModal = () => emit('close');

const deleteHandle = () => {
    // console.log(props.building.id);
    buildStore.deleteBuilding({
        id: props.building.id,
        cb: closeModal
    })
}

</script>
<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Удалить Здания" :style="{ width: '20vw' }">
        <p class="font-medium text-lg">Вы хотите удалить {{ building?.name }}</p>
        <div class="flex flex-row-reverse">
            <Button label="Удалить" @click="deleteHandle" class="text-base py-2 px-3" size="small" severity="danger"/>
        </div>
    </Dialog>
</template>

<style lang="scss" scoped></style>
