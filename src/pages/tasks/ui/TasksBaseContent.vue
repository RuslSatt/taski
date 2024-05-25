<template>
	<h2 class="title">{{ title }}</h2>
	<p v-if="description" class="description">{{ description }}</p>
	<AddTaskButton class="add-task-button" />
	<TaskList :category="category" />
	<Fieldset
		v-if="isFieldset && hasCompletedTasks"
		class="fieldset"
		:toggleable="true"
		:collapsed="themeStore.isCollapsedCompletedTask"
		@update:collapsed="themeStore.toggleCompletedTask"
		legend="Выполнено"
	>
		<TaskList :is-completed-set="true" :category="category" />
	</Fieldset>
	<TaskCreateModal v-if="taskStore.isVisibleAddForm" />
</template>

<script setup lang="ts">
import { AddTaskButton } from '@/feature/add-task';
import { type TaskCategories, useTaskStore } from '@/entities/task';
import { TaskList } from '@/widgets/task-list';
import { TaskCreateModal } from '@/widgets/task-modal';
import { computed } from 'vue';
import { useThemeStore } from '@/entities/theme';

const taskStore = useTaskStore();
const themeStore = useThemeStore();

const props = defineProps<{
	title?: string,
	description?: string,
	category: TaskCategories,
}>();

const isFieldset = computed(() => {
	return props.category !== 'today' && props.category !== 'upcoming';
});

const title = computed(() => {
	if (props.title) return props.title;
	if (props.category === 'inbox') return 'Входящие';
	if (props.category === 'today') return 'Сегодня';
	if (props.category === 'upcoming') return 'Предстоящие';
});

const hasCompletedTasks = computed(() => {
	if (props.category === 'inbox') {
		return taskStore.getCompletedTasks(props.category);
	} else if (props.title) {
		return taskStore.getProjectTasks(true);
	}
});
</script>

<style scoped>
.title {
	font-size: 24px;
	margin-bottom: 20px;
}

.description {
	margin-bottom: 20px;
}

.fieldset {
	margin-top: 20px;
	padding: 0;
	border: none;
	min-width: 0;
}

:deep(.p-toggleable-content) {
	transition: none;
}
</style>
