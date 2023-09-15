import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';
import {getDate} from '../mixins/get_date'

export const useFacultyStore = defineStore('faculty', {
    state: () => ({
        faculties: [],
        faculty_total: [],
        total: [],
        loading: false
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
        },

        async facultyTotal() {
            const res = await http.get('/api/faculty/total');
            const data = await res.data;
            this.faculty_total = data.data;
            this.total = data.totals;
        },

        async addFaculty(obj) {
            try {
                const res = await http.post('/api/faculty', obj.faculty);
                const data = await res.data;
                this.faculty_total.push({ ...data, student_count: 0, booking_count: 0 });
                obj.cb();
                obj.message('kolliu')
                // toast.add({ severity: 'success', summary: 'Факультет', detail: 'Добавлен', life: 3000 });
            } catch (error) {
                console.log(error);
            }
        },

        async facultyEdit(obj) {
            try {
                const res = await http.patch(`/api/faculty/${obj.faculty.id}`, {
                    name: obj.faculty.name
                });
                const data = await res.data;
                const item_id = this.allFacultyTotal.findIndex(item => item.id == obj.faculty.id)
                this.allFacultyTotal[item_id].name = obj.faculty.name
                
                obj.cb()
            } catch (error) {
                console.log(error);
            }
        },

         export() {
            this.loading = true
            http.get('/api/faculty/export', {
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const href = URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = href;
                link.download = ''
                link.setAttribute('download',`${getDate()}-faculty.xlsx`); 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
                this.loading = false
            }).catch((error) => {
                console.log(error);
            })
        },
    }
});
