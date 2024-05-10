import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Project } from './project';
import { supabase } from '@/shared/api/supabase';
import { useUserStore } from '@/entities/user';

export const useProjectStore = defineStore('project', () => {
	const projects = ref<Project[]>([]);
	const selectedProject = ref<Project | null>(null);

	const name = ref<string>('');
	const errorMessage = ref<string>('');
	const isLoading = ref<boolean>(false);

	const isVisibleAddModal = ref<boolean>(false);
	const isVisibleDeleteModal = ref<boolean>(false);

	const userStore = useUserStore();

	function toggleVisibleAddModal() {
		isVisibleAddModal.value = !isVisibleAddModal.value;
		$reset();
	}

	function toggleVisibleDeleteModal() {
		isVisibleDeleteModal.value = !isVisibleDeleteModal.value;
	}

	async function fetchProjects() {
		isLoading.value = true;

		const { data, error } = await supabase
			.from('projects')
			.select()
			.order('created_at', { ascending: true });

		if (error) {
			errorMessage.value = error.message;
		} else if (data) {
			projects.value = data;
		}

		isLoading.value = false;
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
		$reset();
	}

	async function deleteProject() {
		if (!selectedProject.value) return;

		isLoading.value = true;

		const { error } = await supabase
			.from('projects')
			.delete()
			.eq('id', selectedProject.value.id);

		if (error) {
			errorMessage.value = error.message;
		} else {
			projects.value = projects.value.filter(item => selectedProject.value?.id !== item.id);
		}

		isLoading.value = false;
		isVisibleDeleteModal.value = false;
	}

	function $reset() {
		name.value = '';
	}

	return {
		name,
		errorMessage,
		isLoading,
		projects,
		isVisibleAddModal,
		isVisibleDeleteModal,
		toggleVisibleAddModal,
		toggleVisibleDeleteModal,
		addProject,
		fetchProjects,
		deleteProject,
		selectedProject,
		$reset
	};
});
