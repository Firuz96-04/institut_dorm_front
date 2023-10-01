import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';
import {useNotifyStore} from './notification'

const notify = useNotifyStore()

export const useBuildingStore = defineStore('building', {
    state: () => ({
        buildings: [],
        loading: false
    }),

    getters: {
        allBuilding: (state) => state.buildings
    },

    actions: {
        async setAllBuilding() {
            this.loading = true
            const res = await http.get('/api/building');
            const data = await res.data;
            this.buildings = data;
            this.loading = false
        },

        async addBuilding(obj) {
            try {
                const res = await http.post('/api/building', obj.building);
                const data = await res.data;
                this.buildings.push(data);
                obj.cb();
                console.log(data);
            } catch (err) {
                const {error} = err.response.data
                obj.cb();
                notify.addNotification({status:'error', message: error})
            }
        },

        async deleteBuilding(obj) {
            try {
                const res = await http.delete(`/api/building/${obj.id}`);
                const data = await res.data;
                const build_id = this.buildings.findIndex(item => item.id == obj.id)
                this.buildings.splice(build_id, 1)
                obj.cb();
            } catch (err) {
                const {error} = err.response.data
                obj.cb();
                notify.addNotification({status:'error', message: error})
            }
        },

        async editBuilding(obj) {
            const principal = obj.building.principal?.id
            try {
                const res = await http.patch(`/api/building/${obj.building.id}`, {...obj.building, principal});
                const data = await res.data;
                const item_id = this.buildings.findIndex(item => item.id == obj.building.id)
                this.buildings[item_id] = data.data
                
                obj.cb()
            } catch (error) {
                console.log(error);
            }
        },
    }
});
