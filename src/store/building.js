import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';

export const useBuildingStore = defineStore('building', {
    state: () => ({
        buildings: []
    }),

    getters: {
        allBuilding: (state) => state.buildings
    },

    actions: {
        async setAllBuilding() {
            const res = await http.get('/api/building');
            const data = await res.data;
            this.buildings = data;
            console.log(this.buildings);
        },

        async addBuilding(obj) {
            try {
                const res = await http.post('/api/building', obj.building);
                const data = await res.data;
                this.buildings.push(data);
                obj.cb();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        },

        async deleteBuilding(obj) {
            try {
                const res = await http.delete(`/api/building/${obj.id}`);
                const data = await res.data;
                const build_id = this.buildings.findIndex(item => item.id == obj.id)
                this.buildings.splice(build_id, 1)
                obj.cb();
            } catch (error) {
                console.log(error);
            }
        }
    }
});
