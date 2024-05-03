<template>
	<div class="fields" v-if="taskStore.selectedTask">
		<InputText
			v-model="taskStore.selectedTask.name"
			class="task-name"
			placeholder="Название задачи"
		/>
		<InputText
			v-model="taskStore.selectedTask.description"
			class="task-description"
			placeholder="Описание задачи"
		/>
		<DueTaskForm />
		<PriorityTaskSelect />
	</div>
</template>

<script setup lang="ts">
import { DueTaskForm } from '@/feature/due-task';
import { PriorityTaskSelect } from '@/feature/priority-task';
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();

</script>

<style scoped>

</style>
