import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task, TaskPriority } from '@/entities/task';
import { supabase } from '@/shared/api/supabase';
import { useUserStore } from '@/entities/user';
import type { PostgrestError } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { type Project, useProjectStore } from '@/entities/project';
import { useRoute } from 'vue-router';
import {
	isChangedDate,
	isChangedDescription,
	isChangedName,
	isChangedPriority,
	isChangedProjectId
} from './helpers/check-edit-task';
import { useToast } from 'primevue/usetoast';
import { ToastControl } from '@/shared';

export const useTaskStore = defineStore('task', () => {
	const isVisibleAddForm = ref<boolean>(false);
	const isVisibleEditForm = ref<boolean>(false);
	const isVisibleTaskDetails = ref<boolean>(false);
	const isLoad = ref<boolean>(false);

	const name = ref<string>('');
	const description = ref<string>('');
	const due = ref<Date | null>(null);
	const priority = ref<TaskPriority | null>(null);
	const project = ref<Project | null>(null);

	const selectedTask = ref<Task | null>(null);

	const tasks = ref<Task[]>([]);
	const inboxTasks = ref<Task[]>([]);
	const todayTasks = ref<Task[]>([]);
	const upcomingTasks = ref<Task[]>([]);
	const projectTasks = ref<Map<number, Task[]>>(new Map());
	const completedTasks = ref<Map<string | number, Task[]>>(new Map());

	const isLoading = ref<boolean>(false);
	const errorMessage = ref<string>('');

	const isAccessSaveEdit = ref<boolean>(false);
	const isAccessAddTask = ref<boolean>(false);

	const userStore = useUserStore();
	const projectStore = useProjectStore();

	const dateJs = dayjs();
	const route = useRoute();
	const Toast = new ToastControl(useToast());

	function setPageParams() {
		if (route.name === 'today') due.value = new Date();
		if (route.name === 'project') project.value = projectStore.project;
	}

	function toggleVisibleAddForm() {
		$resetFields();
		isVisibleAddForm.value = !isVisibleAddForm.value;
		isVisibleEditForm.value = false;
		isVisibleTaskDetails.value = false;

		if (isVisibleAddForm.value) setPageParams();
	}

	function showEditForm() {
		isVisibleEditForm.value = true;

		isVisibleAddForm.value = false;
		isVisibleTaskDetails.value = false;
	}

	function hideEditForm() {
		isVisibleEditForm.value = false;
		if (!isVisibleEditForm.value) $resetFields();
	}

	function showTaskDetails() {
		isVisibleTaskDetails.value = true;
	}

	function checkAccessEdit() {
		const task = selectedTask.value;
		if (!task) return;

		if (isChangedName(task.name, name.value)) {
			isAccessSaveEdit.value = true;
		} else if (isChangedDescription(task.description, description.value)) {
			isAccessSaveEdit.value = true;
		} else if (isChangedDate(task.due, due.value)) {
			isAccessSaveEdit.value = true;
		} else if (isChangedProjectId(task.project_id, project.value?.id)) {
			isAccessSaveEdit.value = true;
		} else if (isChangedPriority(task.priority?.label, priority.value?.label)) {
			isAccessSaveEdit.value = true;
		} else {
			isAccessSaveEdit.value = false;
		}
	}

	function checkAccessAdd() {
		isAccessAddTask.value = !!name.value;
	}

	function selectTask(task: Task) {
		selectedTask.value = task;

		name.value = task.name;
		description.value = task.description || '';
		due.value = task.due ? new Date(task.due) : null;
		priority.value = task.priority || null;

		if (task.project_id) {
			const foundProject = projectStore.projects.find(item => item.id === task.project_id);
			project.value = foundProject ? foundProject : null;
		} else {
			project.value = null;
		}
	}

	async function fetchTasks() {
		if (isLoad.value) return;

		isLoading.value = true;
		const { data, error } = await supabase
			.from('tasks')
			.select()
			.order('created_at', { ascending: true });

		if (data) {
			isLoad.value = true;
			setTasksByCategory(data);
		}

		setTasksValue(data, error);

		isLoading.value = false;
	}

	function setTasksByCategory(data: Task[]) {
		inboxTasks.value = [];
		todayTasks.value = [];
		upcomingTasks.value = [];
		projectTasks.value = new Map();
		completedTasks.value = new Map();

		for (let task of data) {
			if (task.due) task.due = new Date(task.due);

			if (!task.project_id) {
				task.completed ? setCompletedTask(task, 'inbox') : inboxTasks.value.push(task);
			} else {
				task.completed ? setCompletedTask(task, task.project_id) : setProjectTask(task, task.project_id);
			}

			if (task.due) {
				if (dateJs.isSame(task.due, 'day') || dateJs.isAfter(task.due, 'day') && !task.completed) {
					todayTasks.value.push(task);
				}

				if (dateJs.isBefore(task.due, 'day') && !task.completed) {
					upcomingTasks.value.push(task);
				}
			}
		}
	}

	function setCompletedTask(task: Task, key: string | number) {
		const completed = completedTasks.value.get(key);

		if (!completed) {
			completedTasks.value.set(key, [task]);
		} else {
			completed.push(task);
		}
	}

	function setProjectTask(task: Task, key: number) {
		const tasks = projectTasks.value.get(key);
		if (!tasks) {
			projectTasks.value.set(key, [task]);
		} else {
			tasks.push(task);
		}
	}

	function getCompletedTasks(key: 'inbox') {
		return completedTasks.value.get(key);
	}

	function getProjectTasks(isCompletedTasks?: boolean) {
		const project = projectStore.project;

		if (!project) return;

		if (isCompletedTasks) {
			return completedTasks.value.get(project.id);
		} else {
			return projectTasks.value.get(project.id);
		}
	}

	function setTasksValue(data: Task[] | null, error: PostgrestError | null) {
		if (data) {
			tasks.value = data;
		} else if (error) {
			errorMessage.value = error.message;
		}
	}

	async function addTask() {
		if (!name.value || !userStore.user) return;

		isLoading.value = true;

		const task: Task = {
			id: new Date().getTime(),
			user_id: userStore.user.id,
			project_id: project.value ? project.value.id : null,
			name: name.value,
			description: description.value,
			due: due.value,
			priority: priority.value
		};

		const { error } = await supabase
			.from('tasks')
			.insert(task)
			.select();

		if (error) {
			errorMessage.value = error.message;
			Toast.addErrorToast(error.message);
		} else {
			tasks.value.push(task);
			setTasksByCategory(tasks.value);
			Toast.addSuccessToast(task.name, 'Добавлена задача');

			$resetFields();
			$resetModals();
		}

		isLoading.value = false;
	}

	async function deleteTask(task: Task) {
		isLoading.value = true;

		const { error } = await supabase
			.from('tasks')
			.delete()
			.eq('id', task.id);

		if (error) {
			errorMessage.value = error.message;
			Toast.addErrorToast(error.message);
		} else {
			tasks.value = tasks.value.filter(item => task.id !== item.id);
			setTasksByCategory(tasks.value);
			Toast.addSuccessToast(task.name, 'Удалена задача');
		}

		isLoading.value = false;
	}

	async function updateTask() {
		const task = selectedTask.value;

		if (!task || !isAccessSaveEdit) return;

		isLoading.value = true;

		task.name = name.value;
		task.description = description.value;
		editTaskFields(task);

		const { error } = await supabase
			.from('tasks')
			.update(task)
			.eq('id', task.id);

		if (error) {
			errorMessage.value = error.message;
			Toast.addErrorToast(error.message);
		} else {
			setTasksByCategory(tasks.value);
			Toast.addSuccessToast(task.name, 'Обновлена задача');

			$resetFields();
			$resetModals();
		}

		isLoading.value = false;
	}

	async function updateTaskParams(task: Task) {
		setTasksByCategory(tasks.value);

		const { error } = await supabase
			.from('tasks')
			.update(task)
			.eq('id', task.id);

		if (error) errorMessage.value = error.message;
	}

	async function updateDetailsTask() {
		const task = selectedTask.value;

		if (!task) return;

		editTaskFields(task);

		setTasksByCategory(tasks.value);

		const { error } = await supabase
			.from('tasks')
			.update(task)
			.eq('id', task.id);

		if (error) errorMessage.value = error.message;
	}

	function editTaskFields(task: Task) {
		task.due = due.value;
		task.priority = priority.value;
		task.project_id = project.value ? project.value.id : null;
	}

	function $reset() {
		isLoad.value = false;
		selectedTask.value = null;
		tasks.value = [];
		inboxTasks.value = [];
		todayTasks.value = [];
		upcomingTasks.value = [];
		projectTasks.value = new Map();
		isLoading.value = false;
		errorMessage.value = '';
		isAccessSaveEdit.value = false;
		$resetFields();
		$resetModals();
	}

	function $resetFields() {
		name.value = '';
		description.value = '';
		priority.value = null;
		project.value = null;
		$resetDue();
		isAccessSaveEdit.value = false;
		isAccessAddTask.value = false;
	}

	function $resetModals() {
		isVisibleEditForm.value = false;
		isVisibleAddForm.value = false;
		isVisibleTaskDetails.value = false;
	}

	function $resetDue() {
		due.value = null;
	}

	return {
		isVisibleAddForm,
		isVisibleEditForm,
		isVisibleTaskDetails,
		toggleVisibleAddForm,
		showEditForm,
		hideEditForm,
		showTaskDetails,
		selectTask,
		tasks,
		errorMessage,
		name,
		description,
		due,
		priority,
		project,
		addTask,
		deleteTask,
		updateTask,
		updateTaskParams,
		updateDetailsTask,
		fetchTasks,
		getProjectTasks,
		getCompletedTasks,
		isLoading,
		isLoad,
		selectedTask,
		$reset,
		inboxTasks,
		todayTasks,
		upcomingTasks,
		isAccessSaveEdit,
		isAccessAddTask,
		checkAccessEdit,
		checkAccessAdd
	};
});
