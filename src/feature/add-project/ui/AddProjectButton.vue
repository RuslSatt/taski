<template>
	<Button
		class="button"
		@click.prevent="projectStore.toggleVisibleActionModal"
		text rounded
		icon="pi pi-plus"
		:label="isPage ? 'Добавить проект' : undefined"
	/>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/entities/project';

const projectStore = useProjectStore();

defineProps<{
	isPage?: boolean
}>();
</script>

<style scoped>
</style>
