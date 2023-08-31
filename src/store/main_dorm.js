import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';

export const useMainStore = defineStore('main', {
    state: () => ({
        mains: []
    }),

    getters: {
        allMain: (state) => state.mains
    },

    actions: {
        async setAllMain() {
            const res = await http.get('/api/main-dorm');
            const json = await res.data;
            this.mains = json.data;
        },
    }
});
