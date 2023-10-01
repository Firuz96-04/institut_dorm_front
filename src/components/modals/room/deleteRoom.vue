<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { useRoomStore } from '@/store/room';

const roomStore = useRoomStore();

const props = defineProps({
    visible: {
        type: Boolean,
        reqiured: true
    },
    room: {
        type: Object,
        reqiured: false
    }
});

const emit = defineEmits({
    close: null
});

const deleteHandle = () => {
    roomStore.roomDelete({
        id: props.room.id,
        cb: closeModal
    })
};

const closeModal = () => {
    emit('close');
};
</script>

<template>
    <Dialog :visible="visible" @update:visible="closeModal" modal header="Удалить комнату" :style="{ width: '20vw' }">
        <p class="font-medium text-lg">Вы хотите удалить {{ room?.number }} комнату</p>
        <div class="flex flex-row-reverse">
            <Button label="Удалить" @click="deleteHandle" class="text-base py-2 px-3" size="small" severity="danger" />
        </div>
    </Dialog>
</template>

<style lang="scss" scoped></style>
