import { defineStore } from 'pinia';
// import { http } from '@/api/axios/interceptors';
import api from '@/api/axios/instances'
export const usePriviligeStore = defineStore('privilige', {
    state: () => ({
        priviliges: []
    }),

    getters: {
        getAllPrivilige: (state) => state.priviliges
    },

    actions: {
        async setAllPrivilige() {
            const res = await api.get('/api/privilege');
            const data = await res.data;
            this.priviliges = data;
        },
        
        async addPrivilige(obj) {
            try {
                const res = await api.post('/api/privilege', obj.privilige);
                const json = await res.data;
                this.priviliges.push(json.data);
                obj.cb();
            } catch (error) {
                console.log(error, 'error');
            }
        },

        async editPrivilige(obj) {
            try {
                const res = await api.patch(`/api/privilege/${obj.privilige.id}`, obj.privilige);
                const data = await res.data;
                const item_id = this.priviliges.findIndex(item => item.id == obj.privilige.id)
                this.priviliges[item_id] = obj.privilige
                obj.cb()
            } catch (error) {
                console.log(error);
            }
        },
        async deletePrivilige(obj) {
            try {
                const res = await api.delete(`/api/privilege/${obj.id}`);
                const data = await res.data;
                const item_id = this.priviliges.findIndex(item => item.id == obj.id)
                this.priviliges.splice(item_id, 1)
                obj.cb();
            } catch (error) {
                console.log(error);
            }
        }
    }
});
