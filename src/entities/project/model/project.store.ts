import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Project } from './project';
import { supabase } from '@/shared/api/supabase';
import { useUserStore } from '@/entities/user';
import { router } from '@/app/router/router';
import { useMenuStore } from '@/entities/menu';

export const useProjectStore = defineStore('project', () => {
	const projects = ref<Project[]>([]);
	const project = ref<Project | null>(null);
	const selectedProject = ref<Project | null>(null);

	const name = ref<string>('');
	const errorMessage = ref<string>('');
	const isLoading = ref<boolean>(false);

	const isEditActionModal = ref<boolean>(false);
	const isVisibleActionModal = ref<boolean>(false);
	const isVisibleDeleteModal = ref<boolean>(false);

	const isAccessEdit = ref<boolean>(false);
	const isAccessAdd = ref<boolean>(false);

	const userStore = useUserStore();
	const menuStore = useMenuStore();

	function checkAccessAdd() {
		isAccessAdd.value = !!name.value;
	}

	function checkAccessEdit() {
		isAccessEdit.value = name.value !== selectedProject.value?.name;
	}

	function selectProject(project: Project) {
		selectedProject.value = project;
		name.value = project.name;
	}

	async function setProject(value: Project) {
		project.value = value;
		await router.push({ name: 'project', params: { id: project.value.id }, replace: true });
	}

	function toggleVisibleActionModal() {
		isVisibleActionModal.value = !isVisibleActionModal.value;

		if (!isVisibleActionModal.value) $resetFields();
	}

	function toggleVisibleDeleteModal() {
		isVisibleDeleteModal.value = !isVisibleDeleteModal.value;

		if (!isVisibleDeleteModal.value) $resetFields();
	}

	function toggleVisibleEditModal() {
		isEditActionModal.value = !isEditActionModal.value;
		toggleVisibleActionModal();
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
			menuStore.addProjects(projects.value);
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
			menuStore.addProjects(projects.value);
		}

		isLoading.value = false;
		isVisibleActionModal.value = false;
		$resetFields();
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
			menuStore.addProjects(projects.value);
		}

		isLoading.value = false;
		isVisibleDeleteModal.value = false;
		$resetFields();
	}

	async function updateProject() {
		if (!selectedProject.value) return;

		isLoading.value = true;

		const { error } = await supabase
			.from('projects')
			.update(name.value)
			.eq('id', selectedProject.value.id);

		if (error) {
			errorMessage.value = error.message;
		} else {
			selectedProject.value.name = name.value;
		}

		toggleVisibleEditModal();
		isLoading.value = false;
	}

	function getProjectById(id: number | string) {
		return projects.value.find(item => item.id === id);
	}

	function $resetFields() {
		name.value = '';
		errorMessage.value = '';
		isAccessAdd.value = false;
		isAccessEdit.value = false;
	}

	function $reset() {
		projects.value = [];
		project.value = null;
		selectedProject.value = null;
		isLoading.value = false;
		isEditActionModal.value = false;
		isVisibleActionModal.value = false;
		isVisibleDeleteModal.value = false;
		$resetFields();
	}

	return {
		name,
		errorMessage,
		isLoading,
		projects,
		isVisibleActionModal,
		isVisibleDeleteModal,
		isEditActionModal,
		toggleVisibleActionModal,
		toggleVisibleDeleteModal,
		toggleVisibleEditModal,
		addProject,
		fetchProjects,
		deleteProject,
		updateProject,
		selectProject,
		selectedProject,
		project,
		setProject,
		getProjectById,
		$reset,
		isAccessAdd,
		isAccessEdit,
		checkAccessAdd,
		checkAccessEdit
	};
});
