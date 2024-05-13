import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { MenuItem } from '@/entities/menu';
import { type Project } from '@/entities/project';

export const useMenuStore = defineStore('menu', () => {
	const items = ref<MenuItem[]>([
		{ id: 'inbox', label: 'Входящие', icon: 'pi pi-inbox', mode: 'single', path: '/inbox' },
		{ id: 'today', label: 'Сегодня', icon: 'pi pi-calendar-clock', mode: 'single', path: '/today' },
		{ id: 'upcoming', label: 'Предстоящие', icon: 'pi pi-calendar', mode: 'single', path: '/upcoming' },
		{ id: 'project', label: 'Проекты', children: [], icon: 'pi pi-th-large', mode: 'tree', path: '/projects' }
	]);

	function addProjects(projects: Project[]) {
		if (!projects?.length) return;

		const projectItem = items.value.find(item => item.id === 'project');

		if (!projectItem) return;

		projectItem.children = [];

		for (let project of projects) {
			const item = {
				id: project.id,
				label: project.name,
				path: `projects/${project.id}`
			};

			if (projectItem?.children) {
				projectItem.children.push(item);
			}
		}
	}

	return { items, addProjects };
});
