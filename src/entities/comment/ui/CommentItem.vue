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
		<p v-if="!comment.isEdit" class="comment-text">
			{{ comment.text }}
		</p>
		<slot v-else name="edit"></slot>
	</Panel>
</template>

<script setup lang="ts">
import type { Comment } from '@/entities/comment';

defineProps<{
	comment: Comment;
}>();
</script>

<style scoped>
.comment-avatar {
	display: flex;
}

.comment-text {
	white-space: pre-wrap;
}
</style>
