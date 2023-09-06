import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';

export const usePriviligeStore = defineStore('privilige', {
    state: () => ({
        priviliges: []
    }),

    getters: {
        getAllPrivilige: (state) => state.priviliges
    },

    actions: {
        async setAllPrivilige() {
            const res = await http.get('/api/privilege');
            const data = await res.data;
            this.priviliges = data;
        },

    }
});
