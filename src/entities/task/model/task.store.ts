import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task, TaskInput } from '@/entities/task';
import { supabase } from '@/shared/api/supabase';

export const useTaskStore = defineStore('task', () => {
	const isShowAddForm = ref<boolean>(false);

	const name = ref<string>('');
	const description = ref<string>('');

	const tasks = ref<Task[]>([]);
	const errorMessage = ref<string>('');

	function toggleShowAddForm() {
		isShowAddForm.value = !isShowAddForm.value;
		if (!isShowAddForm.value) $reset();
	}

	async function getTasks() {
		const { data, error } = await supabase
			.from('tasks')
			.select();

		if (data?.length) {
			tasks.value = data;
		} else if (error) {
			errorMessage.value = error.message;
		}
	}

	async function addTask() {
		if (!name.value) return;

		const task: TaskInput = {
			name: name.value,
			description: description.value
		};

		const { error } = await supabase
			.from('tasks')
			.insert(task);

		if (error) errorMessage.value = error.message;

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
		getTasks,
		$reset
	};
});
