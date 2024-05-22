<template>
	<Checkbox
		v-model="task.completed"
		:binary="true"
		@change="taskStore.updateTaskParams(task)"
		@click.stop
	/>
</template>

<script setup lang="ts">
import type { Task } from '@/entities/task';
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();

defineProps<{
	task: Task
}>();

</script>

<style>
.completed .p-checkbox-box {
	border-color: var(--bluegray-200);
	background: var(--bluegray-200);
}
</style>
