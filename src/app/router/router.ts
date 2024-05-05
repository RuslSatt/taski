import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@/pages/auth';
import HomePage from '@/pages/home';
import { InboxTasksPage, TodayTasksPage, UpcomingTasksPage } from '@/pages/tasks';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/auth',
			component: AuthPage
		},
		{
			path: '/',
			component: HomePage,
			children: [
				{
					path: 'inbox',
					component: InboxTasksPage
				},
				{
					path: 'today',
					component: TodayTasksPage
				},
				{
					path: 'upcoming',
					component: UpcomingTasksPage
				}
			]
		}
	]
});

export default router;
