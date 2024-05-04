import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommentFormStore = defineStore('commentForm', () => {
	const isCreateCommentState = ref<boolean>(false);

	function showCreateCommentModal() {
		isCreateCommentState.value = true;
	}

	function hideCreateCommentModal() {
		isCreateCommentState.value = false;
	}

	return { isCreateCommentState, showCreateCommentModal, hideCreateCommentModal };
});
