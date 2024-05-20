<template>
	<Dialog
		class="task-details"
		v-model:visible="taskStore.isVisibleTaskDetails"
		:draggable="false"
		:style="{height: '90%', width: '50vw', maxWidth: '864px'}"
		:breakpoints="{ '1120px': '70vw', '769px': '90vw' }"
		modal
		:closable="!commentStore.isLoading"
		:dismissableMask="commentStore.isLoading"
	>
		<div v-if="commentStore.isLoading && !commentStore.selectedComment" class="skeleton">
			<SkeletonDetails />
		</div>

		<template v-if="!commentStore.isLoading && taskStore.selectedTask" #header>
			<TaskDetailsHeader :task="taskStore.selectedTask" />
		</template>

		<div v-if="!commentStore.isLoading && taskStore.selectedTask" class="task-details-main">
			<InputText
				v-model="taskStore.selectedTask.name"
				class="task-details-name"
				placeholder="Название задачи"
				@change="taskStore.updateDetailsTask"
			/>
			<div class="task-details-fields">
				<div class="task-details-field">
					<p class="task-details-field-title">Срок выполнения</p>
					<div class="task-details-field-item">
						<DueTaskForm @update="taskStore.updateDetailsTask" />
					</div>
				</div>
				<div class="task-details-field">
					<p class="task-details-field-title">Приоритет</p>
					<div class="task-details-field-item">
						<PriorityTaskSelect @update="taskStore.updateDetailsTask" />
					</div>
				</div>
				<div class="task-details-field">
					<p class="task-details-field-title">Проект</p>
					<div class="task-details-field-item">
						<SelectTaskProject @update="taskStore.updateDetailsTask" />
					</div>
				</div>
			</div>
			<Divider align="left" type="solid">
				<b>Описание</b>
			</Divider>
			<div class="task-details-description">
				<Textarea
					class="task-details-description-area"
					v-model="taskStore.selectedTask.description"
					@change="taskStore.updateDetailsTask"
					autoResize
				/>
			</div>
			<Divider align="left" type="solid">
				<b>Комментарии</b>
			</Divider>
			<div class="task-details-comments">
				<div class="task-details-comments-list">
					<TaskComments :comments="commentStore.comments" />
				</div>
			</div>
		</div>

		<template v-if="!commentStore.isLoading && taskStore.selectedTask" #footer>
			<div class="task-details-comment-form">
				<AddCommentForm class="task-details-comments-form" />
			</div>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';
import { useCommentStore } from '@/entities/comment';
import { DueTaskForm } from '@/feature/due-task';
import { PriorityTaskSelect } from '@/feature/priority-task';
import TaskComments from './TaskComments.vue';
import { AddCommentForm, useAddCommentStore } from '@/feature/add-comment';
import { watch } from 'vue';
import TaskDetailsHeader from './TaskDetailsHeader.vue';
import { SkeletonDetails } from '@/shared';
import { SelectTaskProject } from '@/feature/select-task-project';

const taskStore = useTaskStore();
const commentStore = useCommentStore();
const addCommentStore = useAddCommentStore();

watch(() => taskStore.selectedTask, () => {
	if (taskStore.isVisibleTaskDetails) commentStore.fetchComments();
});

watch(() => taskStore.isVisibleTaskDetails, () => {
	if (!taskStore.isVisibleTaskDetails) {
		commentStore.selectedComment = null;
		addCommentStore.hideCreateCommentModal();
	}
});
</script>

<style>
.task-details .p-dialog-content {
	height: 100%;
	padding: 0;
}

.task-details .p-dialog-footer {
	padding: 10px;
	border-top: 1px solid var(--surface-200);
}

.task-details-main, .skeleton {
	display: flex;
	flex-direction: column;
	overflow: auto;
	height: 100%;
	padding: 10px 20px
}

.task-details-name {
	font-size: 24px;
	border: none;
	box-shadow: none;
	margin-bottom: 10px;
	margin-left: -13px;
}

.task-details-fields {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.task-details-field {
	display: flex;
	align-items: center;
	gap: 20px;
}

.task-details-field-title {
	width: 200px;
}

.task-details-field-item {
	width: 250px;
}

.task-details-description {
	width: 100%;
}

.task-details-description-area {
	width: 100%;
	height: 100%;
}

.task-details-comments {
	display: flex;
	flex-direction: column;
	height: 100%;
	gap: 10px;
	padding-bottom: 10px;
	line-height: 1.3;
}

.task-details-comments-list {
	display: flex;
	flex-direction: column;
	gap: 10px;
	flex: 1;
}

.task-details-comment-form {
	width: 100%;
	padding: 0 10px;
}

@media (max-width: 450px) {
	.task-details-field-title {
		display: none;
	}

	.task-details-field-item {
		width: 100%;
	}
}
</style>
