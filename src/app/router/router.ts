import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@/pages/auth';
import HomePage from '@/pages/home';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/auth',
			component: AuthPage
		},
		{
			path: '/',
			component: HomePage
			// children: [
			// 	{
			// 		path: 'tasks',
			// 		component: TasksView
			// 	}
			// ]
		}
	]
});

export default router;