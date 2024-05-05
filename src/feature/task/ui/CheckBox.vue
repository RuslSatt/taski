<template>
	<Checkbox
		v-model="task.completed"
		:binary="true"
		@change="taskStore.updateTaskStatus(task)"
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

<style scoped>

</style>
