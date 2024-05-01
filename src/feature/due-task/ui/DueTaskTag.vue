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
				:value="date"
				@click="clickCallback"
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
	task: Task
}>();

const handlerShow = () => {
	taskStore.selectTask(props.task);
};

const date = computed(() => {
	return props.task.due ? getViewDate(props.task.due) : '';
});
</script>

<style scoped>

:deep(.p-inputtext) {
	display: none
}

</style>
