<template>
	<Dialog
		v-model:visible="taskStore.isVisibleAddForm"
		:style="{width: '100%', maxWidth: '700px'}"
		header="Добавить задачу"
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
