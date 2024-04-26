import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '@/entities/task';
import { useTaskStore } from '@/entities/task';

export const useEditTaskStore = defineStore('editTask', () => {

	const isVisibleForm = ref(false);
	const task = ref<Task | null>(null);
	const isLoading = ref(false);

	function toggleVisibleForm() {
		isVisibleForm.value = !isVisibleForm.value;
		if (!isVisibleForm.value) task.value = null;
	}

	async function editTask() {
		if (task.value) {
			isLoading.value = true;
			const taskStore = useTaskStore();
			await taskStore.updateTask(task.value);
			isVisibleForm.value = false;
			isLoading.value = false;
			task.value = null;
		}
	}

	return { isVisibleForm, task, isLoading, toggleVisibleForm, editTask };
});
