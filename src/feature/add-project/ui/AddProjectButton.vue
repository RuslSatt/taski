<template>
	<Button
		class="button"
		@click.prevent="projectStore.toggleVisibleAddModal"
		text rounded
		icon="pi pi-plus"
	/>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/entities/project';

const projectStore = useProjectStore();
</script>

<style scoped>
.button {
	font-size: 16px;
	width: 25px;
	height: 25px;
}
</style>
