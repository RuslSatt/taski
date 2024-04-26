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
import { useEditTaskStore } from '@/feature/edit-task';

const props = defineProps<{
	task: Task
}>();

const editStore = useEditTaskStore();

const handlerClick = () => {
	editStore.task = props.task;
	editStore.toggleVisibleForm();
};
</script>

<style scoped>

</style>
