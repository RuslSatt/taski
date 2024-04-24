<template>
	<Button
		@click.stop="startDeleteTask"
		icon="pi pi-trash"
		severity="danger"
		text rounded
		aria-label="Удалить"
	/>
</template>

<script setup lang="ts">
import { useDeleteTaskStore } from '@/feature/delete-task';
import type { Task } from '@/entities/task';

const store = useDeleteTaskStore();

const props = defineProps<{
	task: Task
}>();

const startDeleteTask = () => {
	store.task = props.task;
	store.toggleVisibleModal();
};
</script>

<style scoped>

</style>
