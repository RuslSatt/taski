import { app } from '@/main';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';


export function initPrimeComponents() {
	app.component('InputText', InputText);
	app.component('Password', Password);
	app.component('Button', Button);
	app.component('Card', Card);
	app.component('ProgressSpinner', ProgressSpinner);
}
