<template>
	<div class="page">
		<div class="wrapper">
			<div class="content">
				<h2 class="title">{{ title }}</h2>
				<AddTaskButton class="add-task-button" />
				<TaskList />
				<TaskCreateModal v-if="taskStore.isVisibleAddForm" />
			</div>
		</div>
		<TaskDetails />
	</div>
</template>

<script setup lang="ts">
import { AddTaskButton } from '@/feature/add-task';
import { useTaskStore } from '@/entities/task';
import { TaskList } from '@/widgets/task-list';
import { TaskCreateModal } from '@/widgets/task-modal';
import { TaskDetails } from '@/widgets/task-details';
import { computed } from 'vue';

const taskStore = useTaskStore();

const props = defineProps<{
	path: 'inbox' | 'today' | 'upcoming',
}>();

const title = computed(() => {
	if (props.path === 'inbox') return 'Входящие';
	if (props.path === 'today') return 'Сегодня';
	if (props.path === 'upcoming') return 'Предстоящие';
});
</script>

<style scoped>
.page {
	display: flex;
	width: 100%;
}

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
	font-size: 24px;
	align-self: flex-start;
	margin-bottom: 20px;
}

.add-task-button {
	align-self: flex-start;
}
</style>
