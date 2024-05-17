<template>
	<div @click="addCommentStore.showCreateCommentModal" class="comment-form">
		<Textarea
			v-model="addCommentStore.text"
			placeholder="Введите комментарий"
			:class="{area: true, creating: addCommentStore.isCreateCommentState}"
		/>
		<div v-show="addCommentStore.isCreateCommentState" class="comment-form-buttons">
			<Button
				@click.stop="onCancel"
				severity="danger"
				label="Отмена"
				:disabled="addCommentStore.isLoading"
			/>
			<Button
				@click="onCreate"
				label="Комментировать"
				:icon="addCommentStore.isLoading ? 'pi pi-spinner-dotted pi-spin' : undefined"
				:disabled="addCommentStore.isLoading"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAddCommentStore } from '../model/add-comment.store';

const addCommentStore = useAddCommentStore();

const onCancel = () => {
	addCommentStore.hideCreateCommentModal();
};

const onCreate = () => {
	addCommentStore.addComment();
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
	height: 35px;
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
