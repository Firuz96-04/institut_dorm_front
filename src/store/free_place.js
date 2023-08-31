import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';
import { useBuildingStore } from './building';

export const useFreePlaceStore = defineStore('free_place', {
    state: () => ({
        free_places: [],
        free_students: []
    }),

    getters: {
        getAllFreePlace: (state) => state.free_places,
        getFreeStudent: (state) => state.free_students
    },

    actions: {
        async setAllFreePlace(obj) {
            console.log(obj, 'obj');
            const res = await http.get('/api/free-place', { params: obj });
            const data = await res.data;
            this.free_places = data.results;
            const buildStore = useBuildingStore();
            buildStore.$state.buildings = data.building;
        },

        async addFreeBook(obj) {
            console.log(obj, 'obj');
            try {
                const res = await http.post('/api/booking', obj.apartment);
                const json = await res.data;
                console.log(json.data, 'json');
                const free_data = JSON.parse(JSON.stringify(this.free_places));
                const idx = free_data.findIndex((elem) => elem.room_id == obj.apartment.room);
                this.free_places[idx] = json.data;
                obj.cb();
            } catch (error) {
                console.log(error);
            }
        },

        async setAllFreeStudent(obj) {
            const res = await http.get('/api/free-place/find_student', { params: obj });
            const data = await res.data;
            this.free_students = data.data;
        }
    }
});
