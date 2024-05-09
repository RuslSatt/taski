<template>
	<Dialog
		modal
		v-model:visible="projectStore.isVisibleAddModal"
		:style="{width: '100%', maxWidth: '500px'}"
		header="Создать проект"
	>
		<div class="content">
			<InputText v-model="projectStore.name" class="project-name" placeholder="Название проекта" />

			<div class="content-buttons">
				<Button
					@click="projectStore.toggleVisibleAddModal"
					severity="danger"
					label="Отмена"
				/>
				<Button
					label="Добавить"
				/>
			</div>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/entities/project';

const projectStore = useProjectStore();
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
}

.content-buttons {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
	margin-top: 5px;
}
</style>
