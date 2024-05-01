<template>

	<Calendar placeholder="Срок выполнения" v-model="taskStore.due" inputId="due" showIcon iconDisplay="input" />

</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();
</script>

<style scoped>

</style>
