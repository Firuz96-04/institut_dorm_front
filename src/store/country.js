import { http } from '@/api/axios/interceptors';
import { defineStore } from 'pinia';
import {getDate} from '../helpers/get_date'
import {useNotifyStore} from './notification'

const notify = useNotifyStore()
           
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

        async addCountry(obj) {
            try {
                const res = await http.post('/api/country', obj.country);
                const data = await res.data;
                this.country_total.push({ ...data, student_count: 0, booking_count: 0 });
                obj.cb();
                notify.addNotification({status:'success', message: data.name})
            } catch (err) {
                const {error} = err.response.data
                obj.cb();
                notify.addNotification({status:'error', message: error})
            }
        },

        async countryEdit(obj) {
            try {
                const res = await http.patch(`/api/country/${obj.country.id}`, {
                    name: obj.country.name
                });
                const data = await res.data;
                const item_id = this.allCountryTotal.findIndex(item => item.id == obj.country.id)
                this.allCountryTotal[item_id].name = obj.country.name
                
                obj.cb()
            } catch (error) {
                console.log(error);
            }
        },

        async countryDelete(obj) {
            try {
                const res = await http.delete(`/api/country/${obj.id}`);
                const data = await res.data;
                const item_id = this.country_total.findIndex(item => item.id == obj.id)
                this.country_total.splice(item_id, 1)
                obj.cb();
            } catch (error) {
                console.log(error.response);
                obj.cb();
                notify.addNotification({status:'error', message: 'message'})
            }
        },
        
        export() {
            this.loading = true
            http.get('/api/country/export', {
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const href = URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = href;
                link.download = ''
                link.setAttribute('download',`${getDate()}-country.xlsx`); 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
                this.loading = false
            }).catch((error) => {
                console.log(error);
            })
        },
    }
});
