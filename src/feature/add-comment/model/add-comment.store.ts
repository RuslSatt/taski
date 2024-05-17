import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type Comment, useCommentStore } from '@/entities/comment';
import { supabase } from '@/shared/api/supabase';
import { useTaskStore } from '@/entities/task';

export const useAddCommentStore = defineStore('addComment', () => {
	const isCreateCommentState = ref<boolean>(false);

	const text = ref<string>('');
	const isLoading = ref<boolean>(false);
	const errorMessage = ref<string>('');

	const commentStore = useCommentStore();
	const taskStore = useTaskStore();

	function showCreateCommentModal() {
		isCreateCommentState.value = true;
	}

	function hideCreateCommentModal() {
		isCreateCommentState.value = false;
		$resetFields();
	}

	async function addComment() {
		if (!text.value || !taskStore.selectedTask) return;

		isLoading.value = true;

		const comment: Comment = {
			id: new Date().getTime(),
			text: text.value,
			task_id: taskStore.selectedTask.id
		};

		const { data, error } = await supabase
			.from('comments')
			.insert(comment)
			.select();

		if (error) {
			errorMessage.value = error.message;
		} else if (data) {
			commentStore.addComment(comment);
		}

		isLoading.value = false;

		$resetFields();
	}

	function $reset() {
		$resetFields();
		isLoading.value = false;
		errorMessage.value = '';
	}

	function $resetFields() {
		text.value = '';
	}

	return {
		text,
		isLoading,
		errorMessage,
		addComment,
		isCreateCommentState,
		showCreateCommentModal,
		hideCreateCommentModal,
		$reset
	};
});
