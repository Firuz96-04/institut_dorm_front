import { http } from '@/api/axios/interceptors';
import { defineStore } from 'pinia';

export const useBookingStore = defineStore('booking', {
    state: () => ({
        bookings: [],
        paginations: [],
        loading: false
    }),

    getters: {
        getAllBookings: (state) => state.bookings,
        getAllPaginations: (state) => state.paginations
    },

    actions: {
        async setAllBooking(params) {
            this.loading = true
            const res = await http.get('/api/booking', { params: params });
            const json = await res.data;
            this.bookings = json.results;
            this.paginations = json.pagination
            this.loading = false
        },

        async addBook(obj) {
            const res = await http.post('/api/booking');
            const json = await res.data;
            console.log(json, 'zeselit');
        }
    }
});
