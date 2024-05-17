import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Comment } from './comment';
import { supabase } from '@/shared/api/supabase';
import { useTaskStore } from '@/entities/task';

export const useCommentStore = defineStore('comment', () => {
	const comments = ref<Comment[]>([]);

	const text = ref<string>('');

	const isLoading = ref<boolean>(false);
	const errorMessage = ref<string>('');

	const taskStore = useTaskStore();

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

	async function updateComment(comment: Comment) {
		const { error } = await supabase
			.from('comments')
			.update(comment)
			.eq('id', comment.id);

		if (error) errorMessage.value = error.message;
	}

	function $resetFields() {
		text.value = '';
	}

	function $reset() {
		$resetFields();
		comments.value = [];
		isLoading.value = false;
		errorMessage.value = '';
	}

	return { text, isLoading, comments, fetchComments, addComment, deleteComment, updateComment, $resetFields, $reset };
});
