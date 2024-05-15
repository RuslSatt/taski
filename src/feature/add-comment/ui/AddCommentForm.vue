<template>
	<div @click="commentFormStore.showCreateCommentModal" class="comment-form">
		<Textarea
			v-model="commentStore.text"
			placeholder="Введите комментарий"
			:class="{area: true, creating: commentFormStore.isCreateCommentState}"
		/>
		<div v-if="commentFormStore.isCreateCommentState" class="comment-form-buttons">
			<Button @click.stop="onCancel" severity="danger" label="Отмена" />
			<Button @click="onCreate" label="Комментировать" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useCommentFormStore } from '../model/comment-form.store';
import { useCommentStore } from '@/entities/comment';

const commentFormStore = useCommentFormStore();
const commentStore = useCommentStore();

const onCancel = () => {
	commentFormStore.hideCreateCommentModal();
	commentStore.$resetFields();
};

const onCreate = () => {
	commentStore.addComment();
};
</script>

<style scoped>
.comment-form {
	display: flex;
	flex-direction: column;
	gap: 5px;
}

.area {
	width: 100%;
	height: 40px;
}

.area.creating {
	height: 100px;
}

.comment-form-buttons {
	display: flex;
	gap: 10px;
	justify-content: flex-end;
}
</style>
