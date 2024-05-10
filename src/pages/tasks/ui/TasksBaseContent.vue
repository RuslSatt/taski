<template>
	<h2 class="title">{{ title }}</h2>
	<AddTaskButton class="add-task-button" />
	<TaskList :category="category" />
	<TaskCreateModal v-if="taskStore.isVisibleAddForm" />
</template>

<script setup lang="ts">
import { AddTaskButton } from '@/feature/add-task';
import { type TaskCategories, useTaskStore } from '@/entities/task';
import { TaskList } from '@/widgets/task-list';
import { TaskCreateModal } from '@/widgets/task-modal';
import { computed } from 'vue';

const taskStore = useTaskStore();

const props = defineProps<{
	title?: string,
	category: TaskCategories,
}>();

const title = computed(() => {
	if (props.title) return props.title;
	if (props.category === 'inbox') return 'Входящие';
	if (props.category === 'today') return 'Сегодня';
	if (props.category === 'upcoming') return 'Предстоящие';
});
</script>

<style scoped>
.title {
	font-size: 24px;
	margin-bottom: 20px;
}
</style>
