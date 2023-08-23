import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';

export const useRoomStore = defineStore('room', {
    state: () => ({
        rooms: []
    }),

    getters: {
        getAllRoom: (state) => state.rooms
    },

    actions: {
        async setAllRoom() {
            const res = await http.get('/api/room');
            const data = await res.data;
            this.rooms = data.results;
        },

        async addRoom(obj) {
            try {
                const res = await http.post('/api/room', obj.room);
                const data = await res.data;
                this.rooms.push(data);
                obj.cb();
            } catch (error) {
                console.log(error, 'error');
            }
        }
    }
});
