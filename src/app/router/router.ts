import { createRouter, createWebHistory } from 'vue-router';
import AuthPage from '@/pages/auth';
import HomePage from '@/pages/home';
import { InboxTasksPage, ProjectTasksPage, TodayTasksPage, UpcomingTasksPage } from '@/pages/tasks';
import { ProjectsPage } from '@/pages/projects';
import { NotFoundPage } from '@/pages/error';

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/auth',
			component: AuthPage
		},
		{
			name: 'home',
			path: '/',
			component: HomePage,
			children: [
				{
					name: 'inbox',
					path: 'inbox',
					component: InboxTasksPage
				},
				{
					name: 'today',
					path: 'today',
					component: TodayTasksPage
				},
				{
					name: 'upcoming',
					path: 'upcoming',
					component: UpcomingTasksPage
				},
				{
					name: 'projects',
					path: 'projects',
					component: ProjectsPage
				},
				{
					name: 'project',
					path: 'projects/:id',
					component: ProjectTasksPage
				}
			]
		},
		{
			path: '/:catchAll(.*)',
			component: NotFoundPage
		}
	]
});

// export const addProjectTaskRouter = (path: string) => {
// 	router.addRoute('home', {
// 		path, component: ProjectTasksPage
// 	});
// };
