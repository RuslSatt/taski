import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task, TaskInput } from '@/entities/task';
import { supabase } from '@/shared/api/supabase';
import { useUserStore } from '@/entities/user';

export const useTaskStore = defineStore('task', () => {
	const isShowAddForm = ref<boolean>(false);

	const name = ref<string>('');
	const description = ref<string>('');

	const tasks = ref<Task[]>([]);
	const isLoading = ref<boolean>(false);
	const errorMessage = ref<string>('');

	const userStore = useUserStore();

	function toggleShowAddForm() {
		isShowAddForm.value = !isShowAddForm.value;
		if (!isShowAddForm.value) $reset();
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
			description: description.value
		};

		const { error } = await supabase
			.from('tasks')
			.insert(task);

		if (error) {
			errorMessage.value = error.message;
		}

		$reset();
	}

	async function removeTask(task: Task) {
		const { error } = await supabase
			.from('tasks')
			.delete()
			.eq('id', task.id);

		if (error) errorMessage.value = error.message;
	}

	async function updateTask(task: Task) {
		const { error } = await supabase
			.from('tasks')
			.update(task)
			.eq('id', task.id);

		if (error) errorMessage.value = error.message;
	}

	function $reset() {
		name.value = '';
		description.value = '';
		isShowAddForm.value = false;
	}

	return {
		isShowAddForm,
		toggleShowAddForm,
		tasks,
		errorMessage,
		name,
		description,
		addTask,
		removeTask,
		updateTask,
		fetchTasks,
		isLoading,
		$reset
	};
});
