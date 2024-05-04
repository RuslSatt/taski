<template>
	<div :class="{'task-details': true, hide: !taskStore.isVisibleTaskDetails}">
		<header class="task-details-header">

		</header>
		<div v-if="taskStore.selectedTask" class="task-details-body">
			<div class="task-details-fields">
				<InputText
					v-model="taskStore.selectedTask.name"
					class="task-details-name"
					placeholder="Название задачи"
					@blur="taskStore.updateDetailsTask"
				/>
				<div class="task-details-field">
					<p class="field-title">Срок выполнения</p>
					<div class="field-item">
						<DueTaskForm :task="taskStore.selectedTask" />
					</div>
				</div>
				<div class="task-details-field">
					<p class="field-title">Приоритет</p>
					<div class="field-item">
						<PriorityTaskSelect />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';
import { DueTaskForm } from '@/feature/due-task';
import { PriorityTaskSelect } from '@/feature/priority-task';

const taskStore = useTaskStore();
</script>

<style scoped>
.task-details {
	display: flex;
	flex-direction: column;
	border-left: 1px solid var(--surface-300);
	height: 100%;
	width: 100%;
	transition: margin-right 0.3s;
}

.task-details.hide {
	margin-right: -100%;
}

.task-details-body {
	display: flex;
	flex-direction: column;
	gap: 15px;
	padding: 10px;
}

.task-details-name {
	font-size: 24px;
	border: none;
	box-shadow: none;
	margin-bottom: 25px;
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

</style>
