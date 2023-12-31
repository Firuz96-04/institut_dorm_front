import { defineStore } from 'pinia';
// import { http } from '@/api/axios/interceptors';
import api from '@/api/axios/instances'
import {useNotifyStore} from './notification'

const notify = useNotifyStore()
export const useFreePlaceStore = defineStore('free_place', {
    state: () => ({
        free_places: [],
        free_students: [],
        pagination: [],
        loading: false
    }),

    getters: {
        getAllFreePlace: (state) => state.free_places,
        getFreeStudent: (state) => state.free_students,
        getPagination: (state) => state.pagination
    },

    actions: {
        async setAllFreePlace(obj) {
            this.loading = true
            const res = await api.get('/api/free-place', { params: obj });
            const data = await res.data;
            this.free_places = data.results;
            this.pagination = data.pagination
            this.loading = false
        },

        async addFreeBook(obj) {
            try {
                const res = await api.post('/api/booking', obj.apartment);
                const json = await res.data;
                const free_data = JSON.parse(JSON.stringify(this.free_places));
                const idx = free_data.findIndex((elem) => elem.room_id == obj.apartment.room);
                this.free_places[idx] = json.data;
                obj.cb();
            } catch (err) {
                const error = err.response.data.gender
                obj.cb();
                notify.addNotification({status:'error', message: error})
            }
        },

        async setAllFreeStudent(obj) {
            const res = await api.get('/api/free-place/find_student', { params: obj });
            const data = await res.data;
            this.free_students = data.data;
        }
    }
});
