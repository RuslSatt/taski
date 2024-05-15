import { defineStore } from 'pinia';

import { useCommentStore } from '@/entities/comment';
import { useTaskStore } from '@/entities/task';
import { useProjectStore } from '@/entities/project';
import { useMenuStore } from '@/entities/menu';

export const useAppStore = defineStore('app', () => {
	const commentStore = useCommentStore();
	const taskStore = useTaskStore();
	const projectStore = useProjectStore();
	const menuStore = useMenuStore();

	function $reset() {
		taskStore.$reset();
		projectStore.$reset();
		commentStore.$reset();
		menuStore.$reset();
	}

	return { $reset };
});
