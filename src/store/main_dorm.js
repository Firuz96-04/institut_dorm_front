import { defineStore } from 'pinia';
// import { http } from '@/api/axios/interceptors';
import api from '@/api/axios/instances'
export const useMainStore = defineStore('main', {
    state: () => ({
        mains: []
    }),

    getters: {
        allMain: (state) => state.mains
    },

    actions: {
        async setAllMain() {
            const res = await api.get('/api/main-dorm');
            const json = await res.data;
            this.mains = json.data;
        },
    }
});
