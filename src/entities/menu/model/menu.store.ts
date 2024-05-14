import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { MenuItem } from '@/entities/menu';
import { type Project } from '@/entities/project';
import { useRoute } from 'vue-router';

export const useMenuStore = defineStore('menu', () => {
	const items = ref<MenuItem[]>([
		{ id: 'inbox', label: 'Входящие', icon: 'pi pi-inbox', mode: 'single', path: '/inbox' },
		{ id: 'today', label: 'Сегодня', icon: 'pi pi-calendar-clock', mode: 'single', path: '/today' },
		{ id: 'upcoming', label: 'Предстоящие', icon: 'pi pi-calendar', mode: 'single', path: '/upcoming' },
		{ id: 'projects', label: 'Проекты', children: [], icon: 'pi pi-th-large', mode: 'tree', path: '/projects' }
	]);

	const route = useRoute();

	const selectedId = ref<string | number>('inbox');

	function selectItem() {
		if (route.params.id) selectedId.value = +route.params.id;
		if (route.path === '/inbox') selectedId.value = 'inbox';
		if (route.path === '/today') selectedId.value = 'today';
		if (route.path === '/upcoming') selectedId.value = 'upcoming';
		if (route.path === '/projects') selectedId.value = 'projects';
	}

	watch(() => route.path, selectItem);

	function addProjects(projects: Project[]) {
		if (!projects?.length) return;

		const projectItem = items.value.find(item => item.id === 'projects');

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

	return { items, selectedId, addProjects };
});
