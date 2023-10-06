import { defineStore } from 'pinia';
// import { http } from '@/api/axios/interceptors';
import api from '@/api/axios/instances'

export const useRoomTypeStore = defineStore('room_type', {
    state: () => ({
        room_types: []
    }),

    getters: {
        getAllRoomType: (state) => state.room_types
    },

    actions: {
        async setAllRoomType(params) {
            const res = await api.get('/api/room-type', {
                params: params
            });
            const data = await res.data;
            this.room_types = data;
        },

    }
});
