<template>
	<Dialog class="dialog" v-model:visible="projectStore.isVisibleDeleteModal" modal>
		<template #header>
			<div class="header">
				<i class="pi pi-trash"></i>
			</div>
		</template>
		<p class="title">
			Вы действительно хотите удалить
			<span class="name">{{ projectStore.selectedProject?.name }}</span>?
		</p>
		<div class="buttons">
			<Button
				@click="projectStore.toggleVisibleDeleteModal"
				label="Отмена"
				severity="secondary"
				:disabled="!!projectStore.isLoading"
			/>
			<Button
				@click="projectStore.deleteProject"
				:label="projectStore.isLoading ? 'Удаление' : 'Удалить'"
				severity="danger"
				:disabled="!!projectStore.isLoading"
				:icon="projectStore.isLoading ? `pi pi-spin pi-spinner` : undefined"
			/>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/entities/project';

const projectStore = useProjectStore();
</script>

<style scoped>
.title {
	margin-bottom: 1rem;
}

.name {
	font-weight: bold;
	line-height: 20px;
}

.buttons {
	display: flex;
	align-items: center;
	gap: 10px;
	justify-content: flex-end;
	margin-top: 25px;
}
</style>
