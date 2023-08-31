import { defineStore } from 'pinia';
import { http } from '@/api/axios/interceptors';

export const usePaymentStore = defineStore('paymenyt', {
    state: () => ({
        payments: []
    }),

    getters: {},

    actions: {}
});
