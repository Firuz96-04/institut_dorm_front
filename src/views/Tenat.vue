<script setup>
import { computed, ref } from 'vue';
import { useBookingStore } from '@/store/booking';

const bookStore = useBookingStore();
bookStore.setAllBooking();

const tenats = computed(() => bookStore.getAllBookings);
</script>

<template>
    <div>
        {{ tenats }}
    </div>
</template>
