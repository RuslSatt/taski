<template>
	<Button
		@click.stop="taskStore.toggleShowAddForm"
		label="Добавить задачу"
		icon="pi pi-plus"
	/>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();
</script>

<style scoped>

</style>
