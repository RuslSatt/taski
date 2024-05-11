<template>
	<header class="header">
		<ToggleButton v-model="task.completed" @change="taskStore.updateTaskStatus(task)"
					  onLabel="Выполнено"
					  offLabel="Выполнить"
					  onIcon="pi pi-check"
					  offIcon="pi pi-circle"
		/>
		<!--		<Button-->
		<!--			text-->
		<!--			rounded-->
		<!--			icon="pi pi-angle-double-right"-->
		<!--			@click.stop="taskStore.hideTaskDetails"-->
		<!--		/>-->
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
