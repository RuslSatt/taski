import { app } from '@/main';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Avatar from 'primevue/avatar';
import Checkbox from 'primevue/checkbox';
import Skeleton from 'primevue/skeleton';
import Dialog from 'primevue/dialog';
import ProgressBar from 'primevue/progressbar';
import Calendar from 'primevue/calendar';
import Tag from 'primevue/tag';

export function initPrimeComponents() {
	app.component('InputText', InputText);
	app.component('Password', Password);
	app.component('Button', Button);
	app.component('Card', Card);
	app.component('ProgressSpinner', ProgressSpinner);
	app.component('Avatar', Avatar);
	app.component('Checkbox', Checkbox);
	app.component('Skeleton', Skeleton);
	app.component('Dialog', Dialog);
	app.component('ProgressBar', ProgressBar);
	app.component('Calendar', Calendar);
	app.component('Tag', Tag);
}
