import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';
import {useNotifyStore} from './notification'
import ProductService from '../service/RoomService'
const notify = useNotifyStore()

export const useRoomStore = defineStore('room', {
    state: () => ({
        rooms: [],
        pagination: [],
        loading: false
    }),

    getters: {
        getAllRoom: (state) => state.rooms,
        getAllPagination: (state) => state.pagination
    },

    actions: {


        async setAllRoom(params) {
            this.loading = true
            ProductService.sayHello()
            const res = await http.get('/api/room', {
                params: params
            });
            const data = await res.data;
            this.rooms = data.results;
            this.pagination = data.pagination
            this.loading = false
        },

        async addRoom(obj) {
            try {
                const res = await http.post('/api/room', obj.room);
                const data = await res.data;
                this.rooms.push(data);
            
                obj.cb();
            } catch (err) {
                const {error} = err.response.data
                console.log(err.response, 'res');
                obj.cb();
                notify.addNotification({status:'error', message: error})
            }
        },

        
        async roomEdit(obj) {
            try {
                const res = await http.patch(`/api/room/${obj.room.id}`, obj.room);
                const data = await res.data;
                const item_id = this.rooms.findIndex(item => item.id == obj.room.id)
                this.rooms[item_id] = data
                console.log(data, 'room');
                
                obj.cb()
            } catch (error) {
                console.log(error);
            }
        },

        async roomDelete(obj) {
            try {
                const res = await http.delete(`/api/room/${obj.id}`);
                const data = await res.data;
                const item_id = this.rooms.findIndex(item => item.id == obj.id)
                this.rooms.splice(item_id, 1)
                obj.cb();
            } catch (err) {
                const {error} = err.response.data
                obj.cb();
                notify.addNotification({status:'error', message: error})
            }
        },
    }
});
