<template>
	<Dialog class="dialog" v-model:visible="store.isVisibleModal" modal>
		<template #header>
			<div class="header">
				<i class="pi pi-trash"></i>
			</div>
		</template>
		<p class="title">
			Вы действительно хотите удалить
			<span class="name">{{ store.task?.name }}</span>?
		</p>
		<div class="buttons">
			<Button
				@click="store.toggleVisibleModal"
				label="Отмена"
				severity="secondary"
				:disabled="!!store.isLoading"
			/>
			<Button
				@click="store.deleteTask"
				label="Удалить"
				severity="danger"
				:icon="store.isLoading ? 'pi pi-spinner-dotted pi-spin' : undefined"
				:disabled="!!store.isLoading"
			/>
		</div>
	</Dialog>
</template>

<script setup lang="ts">
import { useDeleteTaskStore } from '@/feature/delete-task';

const store = useDeleteTaskStore();
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
