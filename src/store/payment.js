import { defineStore } from 'pinia';
// import { http } from '@/api/axios/interceptors';
import api from '@/api/axios/instances'
import {useBookingStore} from './booking'


export const usePaymentStore = defineStore('paymenyt', {
    state: () => ({
        payments: [],
        loading: false,
        filterList: [],
    }),

    getters: {
        getAllPayment: (state) => state.payments,
        getAllFilterList: (state) => state.filterList
    },

    actions: {

       async findPayment(id) {
        const res = await api.get(`/api/payment?book_id=${id}`);
        const json = await res.data;
        this.payments = json.results
        },

        async addPayment(obj) {
            const bookStore = useBookingStore()
            try {
                const res = await api.post('/api/payment', obj.payment);
                const {data} = await res.data;
                const idx = bookStore.bookings.findIndex((elem) => elem.id == data.booking);
                bookStore.bookings[idx].debt = parseFloat( parseFloat(bookStore.bookings[idx].debt) - parseFloat(data.amount)).toFixed(2)
                bookStore.bookings[idx].payed = parseFloat( parseFloat(bookStore.bookings[idx].payed) + parseFloat(data.amount)).toFixed(2)
                obj.cb();
            } catch (err) {
                const error = err
                console.log(error, 'error');
                // obj.cb();
                // notify.addNotification({status:'error', message: error})
            }
        },

       async payFilterList(params) {
        this.loading = true
        const res = await api.get(`/api/payment/pay_list`, {
            params: params
        })
        const json = await res.data
        this.filterList = {'results':json.results, 'total_sum': json.total_sum}
        this.loading = false
    }
    }
});
