<template>
	<Dialog
		v-model:visible="taskStore.isVisibleAddForm"
		:style="{width: '100%', maxWidth: '700px'}"
		header="Добавить задачу"
	>
		<TaskFormContent />
	</Dialog>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';
import TaskFormContent from '@/feature/add-task/ui/TaskFormContent.vue';

const taskStore = useTaskStore();

</script>

<style scoped>

</style>
