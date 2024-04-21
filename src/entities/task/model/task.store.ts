import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '@/entities/task';
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
			.from('countries')
			.select();

		if (data?.length) {
			tasks.value = data;
		} else if (error) {
			errorMessage.value = error.message;
		}
	}

	function addTask() {

	}

	function removeTask() {

	}

	function updateTask() {

	}

	return { isShowAddForm, toggleShowAddForm, tasks, addTask, removeTask, updateTask, getTasks };
});
