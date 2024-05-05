<template>
	<div class="comment-edit">
		<Textarea
			v-model="comment.text"
			class="comment-edit-area"
		/>

		<div class="comment-edit-buttons">
			<Button @click="comment.isEdit = false" severity="danger" label="Отмена" />
			<Button @click="onSave" label="Сохранить" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Comment } from '@/entities/comment';
import { useCommentStore } from '@/entities/comment';

const commentStore = useCommentStore();

const props = defineProps<{
	comment: Comment;
}>();

const onSave = () => {
	props.comment.isEdit = undefined;
	commentStore.updateComment(props.comment);
};
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
	height: 120px;
}

.comment-edit-buttons {
	display: flex;
	align-items: center;
	gap: 10px;
	justify-content: flex-end;
}
</style>
