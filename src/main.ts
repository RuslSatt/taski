import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app/App.vue';
import router from '@/app/router/router';
import PrimeVue from 'primevue/config';

import '@/app/styles/reset.css';
import '@/app/styles/main.css';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';
import { initPrimeComponents } from '@/shared/ui/prime';

export const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.use(PrimeVue);

initPrimeComponents();
app.mount('#app');
