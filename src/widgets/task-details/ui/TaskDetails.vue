<template>
	<div :class="{'task-details': true, hide: !taskStore.isVisibleTaskDetails}">

		<SkeletonList v-if="commentStore.isLoading" class="skeleton" />

		<div v-if="taskStore.selectedTask && !commentStore.isLoading" class="task-details-body">
			<TaskDetailsHeader class="task-details-header" :task="taskStore.selectedTask" />

			<div class="task-details-main">
				<InputText
					v-model="taskStore.selectedTask.name"
					class="task-details-name"
					placeholder="Название задачи"
					@change="taskStore.updateDetailsTask"
				/>
				<div class="task-details-fields">
					<div class="task-details-field">
						<p class="field-title">Срок выполнения</p>
						<div class="field-item">
							<DueTaskForm @update="taskStore.updateDetailsTask" />
						</div>
					</div>
					<div class="task-details-field">
						<p class="field-title">Приоритет</p>
						<div class="field-item">
							<PriorityTaskSelect @update="taskStore.updateDetailsTask" />
						</div>
					</div>
				</div>
				<Divider align="left" type="solid">
					<b>Описание</b>
				</Divider>
				<div class="task-details-description">
				<Textarea
					class="description-area"
					v-model="taskStore.selectedTask.description"
					@change="taskStore.updateDetailsTask"
				/>
				</div>
				<Divider align="left" type="solid">
					<b>Комментарии</b>
				</Divider>
				<div class="task-comments">
					<div class="task-comments-list">
						<TaskComments :comments="commentStore.comments" />
					</div>
					<AddCommentForm class="task-comments-form" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';
import { useCommentStore } from '@/entities/comment';
import { DueTaskForm } from '@/feature/due-task';
import { PriorityTaskSelect } from '@/feature/priority-task';
import TaskComments from './TaskComments.vue';
import { AddCommentForm } from '@/feature/add-comment';
import { watch } from 'vue';
import TaskDetailsHeader from './TaskDetailsHeader.vue';
import { SkeletonList } from '@/shared';

const taskStore = useTaskStore();
const commentStore = useCommentStore();

watch(() => taskStore.selectedTask, () => {
	if (taskStore.isVisibleTaskDetails) commentStore.fetchComments();
});
</script>

<style scoped>
.task-details {
	display: flex;
	flex-direction: column;
	border-left: 1px solid var(--surface-300);
	height: 100%;
	width: 100%;
	transition: margin-right 0.3s;
	overflow: auto;
}

.task-details-body {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.task-details.hide {
	margin-right: -100%;
}

.task-details-header {
	margin-bottom: 10px;
}

.task-details-main {
	display: flex;
	flex-direction: column;
	gap: 15px;
	height: 100%;
	padding: 10px 10px 10px 25px;
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

.field-title {
	width: 200px;
}

.field-item {

	width: 250px;
}

.task-details-description {
	width: 100%;
	min-height: 100px;
}

.description-area {
	width: 100%;
	height: 100%;
}

.task-comments {
	display: flex;
	flex-direction: column;
	height: 100%;
	gap: 10px;
}

.task-comments-list {
	display: flex;
	flex-direction: column;
	gap: 10px;
	flex: 1;
}

.task-comments-form {
	margin-top: auto;
}

</style>
