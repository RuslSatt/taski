import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Comment } from '@/entities/comment/model/comment';
import { supabase } from '@/shared/api/supabase';

export const useCommentStore = defineStore('comment', () => {
	const comments = ref<Comment[]>([{ id: '1', text: 'Комментарий' }]);
	const comment = ref<Comment | null>(null);

	const text = ref<string>('');

	const isLoading = ref<boolean>(false);
	const errorMessage = ref<string>('');

	async function fetchComments() {
		isLoading.value = true;
		const { data, error } = await supabase
			.from('comments')
			.select()
			.order('created_at', { ascending: true });

		if (data?.length) {
			comments.value = data;
		} else if (error) {
			errorMessage.value = error.message;
		}

		isLoading.value = false;
	}

	return { text, isLoading, comment, comments, fetchComments };
});
