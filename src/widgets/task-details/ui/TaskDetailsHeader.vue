<template>
	<header class="header">
		<ToggleButton
			v-model="task.completed"
			@change="taskStore.updateTaskParams(task)"
			onLabel="Выполнено"
			offLabel="Выполнить"
			onIcon="pi pi-check"
			offIcon="pi pi-circle"
		/>
	</header>
</template>

<script setup lang="ts">
import { type Task, useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();

defineProps<{
	task: Task
}>();
</script>

<style scoped>
.header {
	display: flex;
	gap: 10px;
	align-items: center;
	width: 100%;
}
</style>
