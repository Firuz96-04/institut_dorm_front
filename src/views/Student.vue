<script setup>
import { computed, ref } from 'vue';
import { useStudentStore } from '@/store/student';

const studentStore = useStudentStore();
studentStore.setAllStudent();

const students = computed(() => studentStore.getAllStudent);
</script>

<template>
    <div>
        {{ students }}
        Students
    </div>
</template>