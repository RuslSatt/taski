import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('task', () => {
	const isShowAddForm = ref<boolean>(false);

	function toggleShowAddForm() {
		isShowAddForm.value = !isShowAddForm.value;
	}

	return { isShowAddForm, toggleShowAddForm };
});
