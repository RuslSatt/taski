<template>
	<Button
		icon="pi pi-pencil"
		text rounded
		aria-label="Редактировать"
		@click.stop="handlerClick"
		:severity="task.completed ? 'secondary' : undefined"
	/>
</template>

<script setup lang="ts">
import type { Task } from '@/entities/task';
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();

const props = defineProps<{
	task: Task
}>();

const handlerClick = () => {
	taskStore.selectTask(props.task);
	taskStore.showEditForm();
};
</script>

<style scoped>

</style>
