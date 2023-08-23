<script setup>
import { computed } from 'vue';
import { useRoomStore } from '@/store/room';

const roomStore = useRoomStore();
roomStore.setAllRoom();

const rooms = computed(() => roomStore.getAllRoom);

</script>
<template>
    <div>
        <h3>Room</h3>
        {{ rooms }}
    </div>
</template>
