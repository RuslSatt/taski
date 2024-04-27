<template>
	<Button
		icon="pi pi-pencil"
		text rounded
		aria-label="Редактировать"
		@click.stop="handlerClick"
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
	taskStore.toggleVisibleEditForm();
};
</script>

<style scoped>

</style>
