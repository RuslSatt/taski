<template>
	<div class="comment-edit">
		<Textarea
			v-model="commentStore.text"
			class="comment-edit-area"
			:auto-resize="true"
		/>

		<div class="comment-edit-buttons">
			<Button
				@click="commentStore.selectedComment = null"
				severity="danger"
				label="Отмена"
			/>
			<Button
				@click="commentStore.updateComment"
				label="Сохранить"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Comment } from '@/entities/comment';
import { useCommentStore } from '@/entities/comment';

const commentStore = useCommentStore();

defineProps<{
	comment: Comment;
}>();
</script>

<style scoped>
.comment-edit {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 5px;
}

.comment-edit-area {
	width: 100%;
	max-height: 30vh;
	overflow: auto !important;
}

.comment-edit-buttons {
	display: flex;
	align-items: center;
	gap: 10px;
	justify-content: flex-end;
}
</style>
