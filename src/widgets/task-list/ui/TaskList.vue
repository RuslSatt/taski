<template>
	<ul class="task-list">
		<SkeletonList v-if="isShowSkeleton" class="skeleton" />
		<TaskCard
			v-else
			v-for="task in tasks"
			:task="task"
			:key="task.id"
			:edit-task="taskStore.selectedTask"
			:is-visible-edit-form="taskStore.isVisibleEditForm"
			@click-card="handlerClickCard(task)"
		>
			<template v-slot:checkbox>
				<CheckBox :task="task" />
			</template>
			<template v-slot:tools>
				<DueTaskCalendar :task="task" />
				<EditTaskButton :task="task" />
				<DeleteTaskButton :task="task" />
			</template>
			<template v-slot:tags>
				<DueTaskCalendar :is-tag="true" v-if="task.due" :task="task" />
				<TaskProjectTag v-if="task.project_id" :task="task" />
			</template>
			<template v-slot:editForm>
				<TaskEditModal />
			</template>
		</TaskCard>
		<DeleteTaskModal v-if="taskStore.tasks?.length > 0" />
	</ul>
</template>

<script setup lang="ts">
import { type Task, TaskCard, type TaskCategories, useTaskStore } from '@/entities/task';
import { CheckBox } from '@/feature/task';
import { DeleteTaskButton, DeleteTaskModal } from '@/feature/delete-task';
import { EditTaskButton } from '@/feature/edit-task';
import { DueTaskCalendar } from '@/feature/due-task';
import { TaskEditModal } from '@/widgets/task-modal';
import { SkeletonList } from '@/shared';
import { computed, onMounted } from 'vue';
import { TaskProjectTag } from '@/feature/select-task-project';

const taskStore = useTaskStore();

const props = defineProps<{
	category: TaskCategories;
}>();

const tasks = computed(() => {
	if (props.category === 'inbox') return taskStore.inboxTasks;
	if (props.category === 'today') return taskStore.todayTasks;
	if (props.category === 'upcoming') return taskStore.upcomingTasks;
	if (props.category === 'project') {
		return taskStore.getProjectTasks();
	}
});

onMounted(async () => {
	await taskStore.fetchTasks();
});

const handlerClickCard = (task: Task) => {
	taskStore.selectTask(task);
	taskStore.showTaskDetails();
};

const isShowSkeleton = computed(() => {
	return taskStore.isLoading && !taskStore.isLoad;
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
