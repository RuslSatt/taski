<template>
	<Panel class="comment">
		<template #header>
			<div class="comment-avatar">
				<Avatar label="R" shape="circle" />
			</div>
		</template>
		<template #icons>
			<slot name="actions"></slot>
		</template>
		<p v-if="!isEdit" class="comment-text">
			{{ comment.text }}
		</p>
		<slot v-else name="edit"></slot>
	</Panel>
</template>

<script setup lang="ts">
import type { Comment } from '@/entities/comment';
import { useCommentStore } from '@/entities/comment';
import { computed } from 'vue';

const commentStore = useCommentStore();

const props = defineProps<{
	comment: Comment;
}>();

const isEdit = computed(() => {
	return props.comment.id === commentStore.selectedComment?.id;
});
</script>

<style scoped>
.comment-avatar {
	display: flex;
}

.comment-text {
	white-space: pre-wrap;
}
</style>
