<template>
	<Calendar
		v-model="task.due"
		showIcon
		iconDisplay="input"
		dateFormat="dd.mm.yyyy"
		@update:modelValue="taskStore.updateTaskParams(task)"
	>
		<template #inputicon="{ clickCallback }">
			<Button
				v-if="!isTag"
				class="button"
				text rounded
				aria-label="Редактировать"
				icon="pi pi-calendar"
				:severity="task.completed ? 'secondary' : undefined"
				@click.stop="clickCallback"
			/>
			<Tag
				v-else
				:value="date"
				:severity="task.completed ? 'secondary' : undefined"
				@click.stop="clickCallback"
			/>
		</template>
	</Calendar>
</template>

<script setup lang="ts">
import type { Task } from '@/entities/task';
import { useTaskStore } from '@/entities/task';
import { computed } from 'vue';
import { getViewDate } from '@/shared/lib/date/day';

const taskStore = useTaskStore();

const props = defineProps<{
	isTag?: boolean
	task: Task
}>();

const date = computed(() => {
	return props.task.due ? getViewDate(props.task.due) : '';
});
</script>

<style scoped>
:deep(.p-inputtext) {
	display: none
}

.completed .p-tag {
	color: var(--bluegray-300);
}
</style>
