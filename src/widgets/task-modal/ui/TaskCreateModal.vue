<template>
	<Dialog
		v-model:visible="taskStore.isVisibleAddForm"
		:style="{width: '50vw', maxWidth: '864px'}"
		:breakpoints="{ '1120px': '70vw', '769px': '90vw' }"
		header="Добавить задачу"
		modal
	>
		<TaskModalContent />
	</Dialog>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';
import TaskModalContent from './TaskModalContent.vue';

const taskStore = useTaskStore();

</script>

<style scoped>

</style>
