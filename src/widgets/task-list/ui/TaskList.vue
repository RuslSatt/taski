<template>
	<ul class="task-list">
		<SkeletonList v-if="taskStore.isLoading" class="skeleton" />
		<TaskCard v-else v-for="task in taskStore.tasks" :task="task" :key="task.id" />
	</ul>
</template>

<script setup lang="ts">
import { TaskCard, useTaskStore } from '@/entities/task';
import { onMounted } from 'vue';
import { SkeletonList } from '@/shared';

const taskStore = useTaskStore();

onMounted(async () => {
	await taskStore.fetchTasks();
});
</script>

<style scoped>
.task-list {
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 100%;
	margin-top: 20px;
}
</style>
