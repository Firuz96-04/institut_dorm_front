// import {http} from "@/api/axios/interceptors";
import { http } from '@/api/axios/interceptors';
import { defineStore } from 'pinia';

export const useCountryStore = defineStore('country', {
    state: () => ({
        countries: [],
        country_total: [],
        total: []
    }),

    getters: {
        allCountry: (state) => state.countries,
        allCountryTotal: (state) => state.country_total,
        getTotal: (state) => state.total
    },

    actions: {
        async setAllCountry() {
            const res = await http.get('/api/country');
            const data = await res.data;
            this.countries = data;
            console.log(data);
        },

        async countryTotal() {
            const res = await http.get('/api/country/total');
            const data = await res.data;
            this.country_total = data.data;
            this.total = data.totals;
        },

        
    //    async editCountry(obj) {

    //     },


        async addCountry(obj) {
            console.log(obj);
            try {
                const res = await http.post('/api/country', obj.country);
                const data = await res.data;
                this.country_total.push({ ...data, student_count: 0, booking_count: 0 });
                obj.cb();
                console.log(data, 'data');
            } catch (error) {
                console.log(error);
            }
        }
    }
});
