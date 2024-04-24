<template>
	<ul class="task-list">
		<SkeletonList v-if="taskStore.isLoading" class="skeleton" />
		<TaskCard v-else v-for="task in taskStore.tasks" :task="task" :key="task.id">
			<template v-slot:checkbox>
				<CheckBox :task="task" />
			</template>
			<template v-slot:delete>
				<DeleteTaskButton :task="task" />
			</template>
		</TaskCard>
		<DeleteTaskModal v-if="taskStore.tasks?.length > 0" />
	</ul>
</template>

<script setup lang="ts">
import { TaskCard, useTaskStore } from '@/entities/task';
import { CheckBox } from '@/feature/task';
import { DeleteTaskButton, DeleteTaskModal } from '@/feature/delete-task';
import { SkeletonList } from '@/shared';
import { onMounted } from 'vue';

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