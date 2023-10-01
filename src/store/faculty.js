import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';
import {getDate} from '../helpers/get_date'
import {useNotifyStore} from './notification'

const notify = useNotifyStore()

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
                // obj.message('kolliu 123123')
                // toast.add({ severity: 'success', summary: 'Факультет', detail: 'Добавлен', life: 3000 });
            } catch (err) {
                const {error} = err.response.data
                console.log(err.response, 'res');
                obj.cb();
                notify.addNotification({status:'error', message: error})
            }
        },

        async facultyEdit(obj) {
            try {
                const res = await http.patch(`/api/faculty/${obj.faculty.id}`, {
                    name: obj.faculty.name
                });
                const data = await res.data;
                const item_id = this.faculty_total.findIndex(item => item.id == obj.faculty.id)
                this.faculty_total[item_id].name = obj.faculty.name
                
                obj.cb()
            } catch (error) {
                console.log(error);
            }
        },

        async facultyDelete(obj) {
            try {
                const res = await http.delete(`/api/faculty/${obj.id}`);
                const data = await res.data;
                const item_id = this.faculty_total.findIndex(item => item.id == obj.id)
                this.faculty_total.splice(item_id, 1)
                obj.cb();
            } catch (err) {
                const {error} = err.response.data
                console.log(err.response);
                obj.cb();
                notify.addNotification({status:'error', message: error})
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
