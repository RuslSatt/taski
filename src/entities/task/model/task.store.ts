import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task, TaskPriority } from '@/entities/task';
import { supabase } from '@/shared/api/supabase';
import { useUserStore } from '@/entities/user';
import type { PostgrestError } from '@supabase/supabase-js';
import dayjs from 'dayjs';

export const useTaskStore = defineStore('task', () => {
	const isVisibleAddForm = ref<boolean>(false);
	const isVisibleEditForm = ref<boolean>(false);
	const isVisibleTaskDetails = ref<boolean>(false);

	const name = ref<string>('');
	const description = ref<string>('');
	const due = ref<Date | null>(null);
	const priority = ref<TaskPriority | null>(null);

	const selectedTask = ref<Task | null>(null);

	const tasks = ref<Task[]>([]);
	const isLoading = ref<boolean>(false);
	const errorMessage = ref<string>('');

	const userStore = useUserStore();

	function toggleVisibleAddForm() {
		$reset();
		isVisibleAddForm.value = !isVisibleAddForm.value;
		isVisibleEditForm.value = false;
		isVisibleTaskDetails.value = false;
	}

	function toggleVisibleEditForm() {
		isVisibleEditForm.value = !isVisibleEditForm.value;
		isVisibleAddForm.value = false;
		if (!isVisibleEditForm.value) $reset();
		isVisibleTaskDetails.value = false;
	}

	function showTaskDetails() {
		isVisibleTaskDetails.value = true;
	}

	function hideTaskDetails() {
		isVisibleTaskDetails.value = false;
	}

	function selectTask(task: Task) {
		selectedTask.value = task;
		name.value = selectedTask.value.name;
		description.value = selectedTask.value.description || '';
		due.value = selectedTask.value.due ? new Date(selectedTask.value.due) : null;
		priority.value = selectedTask.value.priority || null;
	}

	async function fetchTasks() {
		isLoading.value = true;
		const { data, error } = await supabase
			.from('tasks')
			.select()
			.order('created_at', { ascending: true });

		setTasksValue(data, error);

		isLoading.value = false;
	}

	async function fetchTodayTasks() {
		isLoading.value = true;
		const { data, error } = await supabase
			.from('tasks')
			.select()
			.lte('due', dayjs())
			.order('created_at', { ascending: true });

		setTasksValue(data, error);

		isLoading.value = false;
	}

	async function fetchUpcomingTasks() {
		isLoading.value = true;
		const { data, error } = await supabase
			.from('tasks')
			.select()
			.gt('due', dayjs())
			.order('created_at', { ascending: true });

		setTasksValue(data, error);

		isLoading.value = false;
	}

	function setTasksValue(data: Task[] | null, error: PostgrestError | null) {
		if (data?.length) {
			tasks.value = data;
		} else if (error) {
			errorMessage.value = error.message;
		}
	}

	async function addTask() {
		if (!name.value || !userStore.user) return;

		const task: Task = {
			id: new Date().getTime(),
			user_id: userStore.user.id,
			name: name.value,
			description: description.value,
			due: due.value,
			priority: priority.value
		};

		tasks.value.push(task);

		$reset(true);

		const { error } = await supabase
			.from('tasks')
			.insert(task)
			.select();

		if (error) {
			errorMessage.value = error.message;
		}
	}

	async function deleteTask(task: Task) {
		tasks.value = tasks.value.filter(item => task.id !== item.id);

		const { error } = await supabase
			.from('tasks')
			.delete()
			.eq('id', task.id);

		if (error) {
			errorMessage.value = error.message;
		}
	}

	async function updateTask() {
		const task = selectedTask.value;

		if (!task) return;

		task.name = name.value;
		task.description = description.value;
		task.due = due.value;
		task.priority = priority.value;

		const { error } = await supabase
			.from('tasks')
			.update(task)
			.eq('id', task.id);

		if (error) errorMessage.value = error.message;

		$reset(true);
	}

	async function updateTaskStatus(task: Task) {
		const { error } = await supabase
			.from('tasks')
			.update(task)
			.eq('id', task.id);

		if (error) errorMessage.value = error.message;
	}

	async function updateDetailsTask() {
		const task = selectedTask.value;

		if (!task) return;

		task.due = due.value;
		task.priority = priority.value;

		const { error } = await supabase
			.from('tasks')
			.update(task)
			.eq('id', task.id);

		if (error) errorMessage.value = error.message;
	}

	function $reset(isForm?: boolean) {
		name.value = '';
		description.value = '';
		priority.value = null;

		$resetDue();

		if (!isForm) return;

		isVisibleEditForm.value = false;
		isVisibleAddForm.value = false;
	}

	function $resetDue() {
		due.value = null;
	}

	return {
		isVisibleAddForm,
		isVisibleEditForm,
		isVisibleTaskDetails,
		toggleVisibleAddForm,
		toggleVisibleEditForm,
		showTaskDetails,
		hideTaskDetails,
		selectTask,
		tasks,
		errorMessage,
		name,
		description,
		due,
		priority,
		addTask,
		deleteTask,
		updateTask,
		updateTaskStatus,
		updateDetailsTask,
		fetchTasks,
		fetchTodayTasks,
		fetchUpcomingTasks,
		isLoading,
		selectedTask,
		$reset,
		$resetDue
	};
});
