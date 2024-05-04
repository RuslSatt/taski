<template>
	<Calendar
		placeholder="Срок выполнения"
		:v-model="task ? task.due : taskStore.due"
		showIcon
		iconDisplay="input"
		dateFormat="dd.mm.yy"
		class="calendar"
	/>
</template>

<script setup lang="ts">
import { type Task, useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();

defineProps<{
	task?: Task
}>();
</script>

<style scoped>
.calendar {
	width: 100%;
}
</style>
