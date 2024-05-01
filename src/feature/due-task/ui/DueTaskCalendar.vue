<template>
	<Calendar
		v-model="taskStore.due"
		showIcon
		iconDisplay="input"
		dateFormat="dd.mm.yyyy"
		@update:modelValue="taskStore.updateTask"
		@show="handlerShow"
	>
		<template #inputicon="{ clickCallback }">
			<Button
				class="button"
				text rounded
				aria-label="Редактировать"
				icon="pi pi-calendar"
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
