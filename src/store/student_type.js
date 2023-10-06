import { defineStore } from 'pinia';
// import { http } from '@/api/axios/interceptors';
import api from '@/api/axios/instances'

export const useStudentTypeStore = defineStore('student_type', {
    state: () => ({
        student_types: []
    }),

    getters: {
        getAllStudentType: (state) => state.student_types
    },

    actions: {
        async setAllStudentType() {
            const res = await api.get('/api/student-type');
            const data = await res.data;
            this.student_types = data;
        },

    }
});
