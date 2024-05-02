<template>
	<Dropdown
		placeholder="Приоритет"
		:options="models"
		v-model="taskStore.priority"
		showClear
		optionLabel="label"
	/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { priorities } from '../model/priorities';
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();

const models = ref(priorities);
</script>

<style scoped>

</style>
