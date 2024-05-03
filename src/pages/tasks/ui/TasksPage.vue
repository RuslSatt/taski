<template>
	<div class="wrapper">
		<div class="content">
			<h2 class="title">Задачи</h2>
			<AddTaskButton class="add-task-button" />
			<TaskList />
			<TaskCreateModal v-if="taskStore.isVisibleAddForm" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { AddTaskButton } from '@/feature/add-task';
import { useTaskStore } from '@/entities/task';
import { TaskList } from '@/widgets/task-list';
import { TaskCreateModal } from '@/widgets/task-modal';

const taskStore = useTaskStore();
</script>

<style scoped>
.wrapper {
	width: 100%;
	overflow: auto;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	width: 100%;
	max-width: 700px;
	margin: auto;
}

.title {
	font-size: 26px;
	align-self: flex-start;
	margin-bottom: 20px;
}

.add-task-button {
	align-self: flex-start;
}
</style>
