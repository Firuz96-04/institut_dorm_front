import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import {FontAwesomeIcon} from '@/plugins/font-awesome'
import PrimeVueComponents from './plugins/primevue-components'; // Adjust the import path accordingly

import setupInterceptors from './api/axios/interceptors';

import '@/assets/styles.scss';
import '@/assets/main.scss';

const pinia = createPinia();
const app = createApp(App);
setupInterceptors()
app.use(router);
app.use(pinia);
app.use(PrimeVueComponents)
app.component('vue-icon', FontAwesomeIcon);
app.mount('#app');
