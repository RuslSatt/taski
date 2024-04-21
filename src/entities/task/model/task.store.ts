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

	function removeTask() {

	}

	function updateTask() {

	}

	return { isShowAddForm, toggleShowAddForm, tasks, addTask, removeTask, updateTask, getTasks };
});
