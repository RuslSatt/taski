<template>
	<div class="wrapper">
		<div class="content">
			<h2 class="title">Задачи</h2>
			<AddTaskButton class="add-task-button" />
			<AddTaskForm v-if="taskStore.isShowAddForm" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { AddTaskButton, AddTaskForm } from '@/feature/task';
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: center;
	width: 100%;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	width: 70%;
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
