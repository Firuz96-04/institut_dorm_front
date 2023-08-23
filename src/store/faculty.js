import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';

export const useFacultyStore = defineStore('faculty', {
    state: () => ({
        faculties: [],
        faculty_total: [],
        total: []
    }),

    getters: {
        getAllFaculty: (state) => state.faculties,
        allFacultyTotal: (state) => state.faculty_total,
        getTotal: (state) => state.total
    },

    actions: {
        async setAllFaculty() {
            const res = await http.get('/api/faculty');
            const data = await res.data;
            this.faculties = data;
            console.log(data);
        },

        async facultyTotal() {
            const res = await http.get('/api/faculty/total');
            const data = await res.data;
            this.faculty_total = data.data;
            this.total = data.totals;
            console.log(data);
        },

        async addFaculty(obj) {
            try {
                const res = await http.post('/api/faculty', obj.faculty);
                const data = await res.data;
                this.faculty_total.push({ ...data, student_count: 0, booking_count: 0 });
                obj.cb();
            } catch (error) {
                console.log(error);
            }
        }
    }
});
