import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import App from './app/App.vue';
import router from '@/app/router/router';

const app = createApp(App);

app.use(PrimeVue);
app.use(createPinia());
app.use(router);
app.mount('#app');
