<template>
	<div class="card-content">
		<InputText v-model="taskStore.name" class="task-name" placeholder="Название задачи" />
		<InputText v-model="taskStore.description" class="task-description" placeholder="Описание задачи" />
		<div class="card-properties">
			<DueTaskForm />
			<PriorityTaskSelect />
		</div>
		<div class="card-buttons">
			<Button
				@click="toggleVisible"
				severity="danger"
				label="Отмена"
			/>
			<Button
				@click="actionTask"
				:label="label"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';
import { computed } from 'vue';
import { DueTaskForm } from '@/feature/due-task';
import { PriorityTaskSelect } from '@/feature/priority-task';

const taskStore = useTaskStore();

const toggleVisible = computed(() => {
	return taskStore.selectedTask ? taskStore.toggleVisibleEditForm : taskStore.toggleVisibleAddForm;
});

const actionTask = computed(() => {
	return taskStore.selectedTask ? taskStore.updateTask : taskStore.addTask;
});

const label = computed(() => {
	return taskStore.selectedTask ? 'Сохранить' : 'Добавить';
});
</script>

<style scoped>
.card-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
}

.task-name, .task-description {
	border: none;
	box-shadow: none
}

.task-name {
	font-size: 18px;
}

.task-description {
	font-size: 14px;
}

.card-buttons {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
	margin-top: 5px;
}

.card-properties {
	display: flex;
	flex-direction: column;
	width: 250px;
	gap: 10px;
	margin-top: 5px;
}
</style>
