<template>
	<Calendar
		placeholder="Срок выполнения"
		v-model="taskStore.due"
		showIcon
		iconDisplay="input"
		dateFormat="dd.mm.yy"
	/>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();
</script>

<style scoped>

</style>
