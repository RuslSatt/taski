<template>
	<Dialog
		modal
		v-model:visible="projectStore.isVisibleActionModal"
		:style="{width: '50vw', maxWidth: '500px'}"
		:breakpoints="{ '1120px': '70vw', '769px': '90vw' }"
		:header="title"
		:closable="false"
	>
		<div class="content">
			<InputText
				v-model="projectStore.name"
				class="project-name"
				placeholder="Название проекта"
			/>
			<Textarea
				v-model="projectStore.description"
				class="project-description"
				placeholder="Описание проекта"
				:autoResize="true"
			/>
			<SelectProjectColor />
			<div class="content-buttons">
				<Button
					@click="onCancel"
					severity="danger"
					label="Отмена"
					:disabled="!!projectStore.isLoading"
				/>
				<Button
					:label="labelButton"
					@click="onSave"
					:icon="projectStore.isLoading ? `pi pi-spin pi-spinner-dotted` : undefined"
					:disabled="isDisabledButton"
				/>
			</div>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/entities/project';
import { computed } from 'vue';
import { SelectProjectColor } from '@/feature/project/select-project-color';

const projectStore = useProjectStore();

const title = computed(() => {
	return projectStore.isEditActionModal ? 'Редактировать проект' : 'Создать проект';
});

const labelButton = computed(() => {
	return projectStore.isEditActionModal ? 'Сохранить' : 'Добавить';
});

const onCancel = computed(() => {
	return projectStore.isEditActionModal ? projectStore.toggleVisibleEditModal : projectStore.toggleVisibleActionModal;
});

const onSave = computed(() => {
	return projectStore.isEditActionModal ? projectStore.updateProject : projectStore.addProject;
});

const isDisabledButton = computed(() => {
	if (projectStore.isEditActionModal) {
		return projectStore.isLoading || !projectStore.isAccessEdit;
	} else {
		return projectStore.isLoading || !projectStore.isAccessAdd;
	}
});

projectStore.$subscribe(() => {
	if (projectStore.isEditActionModal) {
		projectStore.checkAccessEdit();
	} else {
		projectStore.checkAccessAdd();
	}
});

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

