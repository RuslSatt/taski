import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Project } from './project';

export const useProjectStore = defineStore('project', () => {
	const projects = ref<Project[]>([]);

	const name = ref<string>('');

	const isVisibleAddModal = ref<boolean>(false);

	function toggleVisibleAddModal() {
		isVisibleAddModal.value = !isVisibleAddModal.value;
	}

	return { name, projects, isVisibleAddModal, toggleVisibleAddModal };
});
