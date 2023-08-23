import { http } from '@/api/axios/interceptors';
import { defineStore } from 'pinia';

export const useBookingStore = defineStore('booking', {
    state: () => ({
        bookings: []
    }),

    getters: {
        getAllBookings: (state) => state.bookings
    },

    actions: {
        async setAllBooking(params) {
            const res = await http.get('/api/booking', { params: params });
            const json = await res.data;
            this.bookings = json.data;
        },

        async addBook(obj) {
            const res = await http.post('/api/booking');
            const json = await res.data;
            console.log(json);
        }
    }
});
