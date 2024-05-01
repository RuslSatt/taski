<template>
	<Calendar
		v-model="taskStore.due"
		showIcon
		iconDisplay="input"
		@update:modelValue="taskStore.updateTask"
		@show="handlerShow"
	>
		<template #inputicon="{ clickCallback }">
			<Tag
				:value="task.due || 'Срок выполнения'"
				@click="clickCallback"
			/>
		</template>
	</Calendar>
</template>

<script setup lang="ts">
import type { Task } from '@/entities/task';
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();

const props = defineProps<{
	task: Task
}>();

const handlerShow = () => {
	taskStore.selectTask(props.task);
};
</script>

<style scoped>

:deep(.p-inputtext) {
	display: none
}

</style>
