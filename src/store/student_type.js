import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';

export const useStudentTypeStore = defineStore('student_type', {
    state: () => ({
        student_types: []
    }),

    getters: {
        getAllStudentType: (state) => state.student_types
    },

    actions: {
        async setAllStudentType() {
            const res = await http.get('/api/student-type');
            const data = await res.data;
            this.student_types = data;
        },

    }
});
