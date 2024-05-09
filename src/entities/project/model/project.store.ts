import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Project } from './project';

export const useProjectStore = defineStore('project', () => {
	const projects = ref<Project[]>([]);

	return { projects };
});
