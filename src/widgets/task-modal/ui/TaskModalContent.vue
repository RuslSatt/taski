<template>
	<div class="card-content">
		<InputText
			v-model="taskStore.name"
			class="task-name"
			placeholder="Название задачи"
			:autoResize="true"
		/>
		<Textarea
			v-model="taskStore.description"
			class="task-description"
			placeholder="Описание задачи"
			:autoResize="true"
		/>
		<div class="card-properties">
			<DueTaskForm class="card-due" />
			<PriorityTaskSelect class="card-priority" />
			<SelectTaskProject class="card-select" />
		</div>
		<div class="card-buttons">
			<Button
				@click="toggleVisible"
				severity="danger"
				label="Отмена"
				:disabled="!!taskStore.isLoading"
			/>
			<Button
				@click="actionTask"
				:label="label"
				:icon="taskStore.isLoading ? 'pi pi-spinner-dotted pi-spin' : undefined"
				:disabled="isDisabledButton"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';
import { computed } from 'vue';
import { DueTaskForm } from '@/feature/due-task';
import { PriorityTaskSelect } from '@/feature/priority-task';
import { SelectTaskProject } from '@/feature/select-task-project';

const taskStore = useTaskStore();

const toggleVisible = computed(() => {
	return taskStore.isVisibleEditForm ? taskStore.hideEditForm : taskStore.toggleVisibleAddForm;
});

const actionTask = computed(() => {
	return taskStore.isVisibleEditForm ? taskStore.updateTask : taskStore.addTask;
});

const label = computed(() => {
	return taskStore.isVisibleEditForm ? 'Сохранить' : 'Добавить';
});

const isDisabledButton = computed(() => {
	if (taskStore.isVisibleEditForm) {
		return taskStore.isLoading || !taskStore.isAccessSaveEdit;
	} else if (taskStore.isVisibleAddForm) {
		return taskStore.isLoading || !taskStore.isAccessAddTask;
	}
});

taskStore.$subscribe(() => {
	if (taskStore.isVisibleEditForm) taskStore.checkAccessEdit();
	if (taskStore.isVisibleAddForm) taskStore.checkAccessAdd();
});
</script>

<style scoped>
.card-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
	overflow: hidden;
}

.task-name, .task-description {
	border: 1px solid var(--surface-200);
}

.task-name {
	font-size: 16px;
	overflow: hidden;
	text-overflow: ellipsis;
}

.task-description {
	font-size: 14px;
	overflow: hidden;
}

.card-buttons {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
	margin-top: 5px;
}

.card-properties {
	display: flex;
	gap: 10px;
	margin-top: 5px;
}

.card-due {
	flex: 1 1 30%;
}

.card-priority {
	flex: 1 1 30%;
}

.card-select {
	flex: 1 1 40%;
}

@media (max-width: 559px) {
	.card-properties {
		flex-direction: column;
		width: 100%;
	}

	.card-due {
		width: 100%;
	}

	.card-select {
		width: 100%;
	}
}
</style>
