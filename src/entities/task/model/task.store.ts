import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task, TaskInput } from '@/entities/task';
import { supabase } from '@/shared/api/supabase';

export const useTaskStore = defineStore('task', () => {
	const isShowAddForm = ref<boolean>(false);
	const tasks = ref<Task[]>([]);
	const errorMessage = ref<string>('');

	function toggleShowAddForm() {
		isShowAddForm.value = !isShowAddForm.value;
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

	async function addTask(task: TaskInput) {
		const { error } = await supabase
			.from('tasks')
			.insert(task);

		if (error) errorMessage.value = error.message;
	}

	async function removeTask(task: Task) {
		const { error } = await supabase
			.from('countries')
			.delete()
			.eq('id', task.id);

		if (error) errorMessage.value = error.message;
	}

	async function updateTask(task: Task) {
		const { error } = await supabase
			.from('countries')
			.update(task)
			.eq('id', task.id);

		if (error) errorMessage.value = error.message;
	}

	return {
		isShowAddForm,
		toggleShowAddForm,
		tasks,
		errorMessage,
		addTask,
		removeTask,
		updateTask,
		getTasks
	};
});
