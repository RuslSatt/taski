import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '@/entities/task';
import { useTaskStore } from '@/entities/task';

export const useDeleteTaskStore = defineStore('deleteTask', () => {

	const isVisibleModal = ref(false);
	const task = ref<Task | null>(null);

	function toggleVisibleModal() {
		isVisibleModal.value = !isVisibleModal.value;
	}

	async function deleteTask() {
		if (task.value) {
			const taskStore = useTaskStore();
			await taskStore.deleteTask(task.value);
			isVisibleModal.value = false;
		}
	}

	return { isVisibleModal, task, toggleVisibleModal, deleteTask };
});
