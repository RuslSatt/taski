import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task, TaskInput, TaskPriority } from '@/entities/task';
import { supabase } from '@/shared/api/supabase';
import { useUserStore } from '@/entities/user';

export const useTaskStore = defineStore('task', () => {
	const isVisibleAddForm = ref<boolean>(false);
	const isVisibleEditForm = ref<boolean>(false);
	const isVisibleTaskPage = ref<boolean>(false);

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
	}

	function toggleVisibleEditForm() {
		isVisibleEditForm.value = !isVisibleEditForm.value;
		isVisibleAddForm.value = false;
		if (!isVisibleEditForm.value) $reset();
	}

	function toggleVisibleTaskPage() {
		isVisibleTaskPage.value = !isVisibleTaskPage.value;
	}

	function selectTask(task: Task) {
		selectedTask.value = task;
		name.value = selectedTask.value.name;
		description.value = selectedTask.value.description || '';
		if (selectedTask.value.due) {
			due.value = new Date(selectedTask.value.due);
		}
		priority.value = selectedTask.value.priority;
	}

	async function fetchTasks() {
		isLoading.value = true;
		const { data, error } = await supabase
			.from('tasks')
			.select()
			.order('created_at', { ascending: true });

		if (data?.length) {
			tasks.value = data;
		} else if (error) {
			errorMessage.value = error.message;
		}

		isLoading.value = false;
	}

	async function addTask() {
		if (!name.value || !userStore.user) return;

		const task: TaskInput = {
			userId: userStore.user.id,
			name: name.value,
			description: description.value,
			due: due.value,
			priority: priority.value
		};

		const { data, error } = await supabase
			.from('tasks')
			.insert(task)
			.select();

		if (error) {
			errorMessage.value = error.message;
		} else if (data) {
			tasks.value.push(data[0]);
		}

		$reset(true);
	}

	async function deleteTask(task: Task) {
		const { error } = await supabase
			.from('tasks')
			.delete()
			.eq('id', task.id);

		if (error) {
			errorMessage.value = error.message;
		} else {
			tasks.value = tasks.value.filter(item => task.id !== item.id);
		}
	}

	async function updateTask() {
		const task = selectedTask.value;

		if (!task) return;

		// TODO Изменить условие проверки.
		// if (task.name === name.value && task.description === description.value && task.due === due.value) {
		// 	$reset(true);
		// 	return;
		// }

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

	function $reset(isForm?: boolean) {
		name.value = '';
		description.value = '';
		selectedTask.value = null;
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
		isVisibleTaskPage,
		toggleVisibleAddForm,
		toggleVisibleEditForm,
		toggleVisibleTaskPage,
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
		fetchTasks,
		isLoading,
		selectedTask,
		$reset,
		$resetDue
	};
});
