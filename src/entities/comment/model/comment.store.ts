import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Comment, CommentInput } from './comment';
import { supabase } from '@/shared/api/supabase';
import { useTaskStore } from '@/entities/task';

export const useCommentStore = defineStore('comment', () => {
	const comments = ref<Comment[]>([{ id: '1', task_id: '1', text: 'Комментарий' }]);
	const comment = ref<Comment | null>(null);

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

	async function addComment() {
		if (!text.value || !taskStore.selectedTask) return;

		const comment: CommentInput = {
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
			comments.value.push(data[0]);
		}

		$reset();
	}

	function $reset() {
		text.value = '';
		comment.value = null;
	}

	return { text, isLoading, comment, comments, fetchComments, addComment, $reset };
});
