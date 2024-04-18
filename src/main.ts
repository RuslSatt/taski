import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './app/App.vue';
import router from '@/app/router/router';
import PrimeVue from 'primevue/config';

import '@/app/styles/reset.css';
import 'primevue/resources/themes/aura-light-green/theme.css';
import { initPrimeComponents } from '@/shared/ui/prime';

export const app = createApp(App);

app.use(PrimeVue);
app.use(createPinia());
app.use(router);
initPrimeComponents();
app.mount('#app');
