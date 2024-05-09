import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Project } from './project';
import { supabase } from '@/shared/api/supabase';
import { useUserStore } from '@/entities/user';

export const useProjectStore = defineStore('project', () => {
	const projects = ref<Project[]>([]);

	const name = ref<string>('');
	const errorMessage = ref<string>('');
	const isLoading = ref<boolean>(false);

	const isVisibleAddModal = ref<boolean>(false);

	const userStore = useUserStore();

	function toggleVisibleAddModal() {
		isVisibleAddModal.value = !isVisibleAddModal.value;
	}

	async function addProject() {
		if (!name.value || !userStore.user) return;

		isLoading.value = true;

		const project: Project = {
			id: new Date().getTime(),
			name: name.value,
			user_id: userStore.user.id
		};

		const { data, error } = await supabase
			.from('projects')
			.insert(project)
			.select();

		if (error) {
			errorMessage.value = error.message;
		} else if (data) {
			projects.value.push(data[0]);
		}

		isLoading.value = false;
		isVisibleAddModal.value = false;
	}

	return { name, errorMessage, isLoading, projects, isVisibleAddModal, toggleVisibleAddModal, addProject };
});
