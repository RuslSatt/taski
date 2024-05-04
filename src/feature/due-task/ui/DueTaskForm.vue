<template>
	<Calendar
		placeholder="Срок выполнения"
		v-model="taskStore.due"
		showIcon
		iconDisplay="input"
		dateFormat="dd.mm.yy"
		class="calendar"
		@update:modelValue="handlerUpdate"
	/>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();

const emit = defineEmits(['update']);

const handlerUpdate = () => {
	emit('update');
};

</script>

<style scoped>
.calendar {
	width: 100%;
}
</style>
