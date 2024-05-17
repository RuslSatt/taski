import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Comment } from './comment';
import { supabase } from '@/shared/api/supabase';
import { useTaskStore } from '@/entities/task';

export const useCommentStore = defineStore('comment', () => {
	const comments = ref<Comment[]>([]);
	const selectedComment = ref<Comment | null>(null);

	const text = ref<string>('');

	const isLoading = ref<boolean>(false);
	const errorMessage = ref<string>('');

	const taskStore = useTaskStore();

	function selectComment(comment: Comment) {
		selectedComment.value = comment;
		text.value = comment.text;
	}

	async function fetchComments() {
		if (!taskStore.selectedTask) return;

		isLoading.value = true;
		const { data, error } = await supabase
			.from('comments')
			.select()
			.eq('task_id', taskStore.selectedTask.id)
			.order('created_at', { ascending: true });

		if (data) {
			comments.value = data;
		} else if (error) {
			errorMessage.value = error.message;
		}

		isLoading.value = false;
	}

	function addComment(comment: Comment) {
		comments.value.push(comment);
	}

	async function deleteComment(comment: Comment) {
		const { error } = await supabase
			.from('comments')
			.delete()
			.eq('id', comment.id);

		if (error) {
			errorMessage.value = error.message;
		} else {
			comments.value = comments.value.filter(item => comment.id !== item.id);
		}
	}

	async function updateComment() {
		const comment = selectedComment.value;
		if (!comment) return;

		selectedComment.value = null;

		if (comment.text === text.value) return;

		comment.text = text.value;

		const { error } = await supabase
			.from('comments')
			.update(comment)
			.eq('id', comment.id);

		if (error) errorMessage.value = error.message;

		$resetFields();
	}

	function $resetFields() {
		text.value = '';
	}

	function $reset() {
		$resetFields();
		comments.value = [];
		isLoading.value = false;
		errorMessage.value = '';
		selectedComment.value = null;
	}

	return {
		text,
		isLoading,
		comments,
		fetchComments,
		addComment,
		deleteComment,
		updateComment,
		$resetFields,
		$reset,
		selectComment,
		selectedComment
	};
});
