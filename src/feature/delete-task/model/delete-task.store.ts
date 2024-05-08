import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '@/entities/task';
import { useTaskStore } from '@/entities/task';

export const useDeleteTaskStore = defineStore('deleteTask', () => {

	const isVisibleModal = ref(false);
	const task = ref<Task | null>(null);
	const isLoading = ref(false);

	function toggleVisibleModal() {
		isVisibleModal.value = !isVisibleModal.value;
	}

	async function deleteTask() {
		if (task.value) {
			isLoading.value = true;
			const taskStore = useTaskStore();
			isVisibleModal.value = false;
			await taskStore.deleteTask(task.value);
			isLoading.value = false;
		}
	}

	return { isVisibleModal, task, isLoading, toggleVisibleModal, deleteTask };
});
