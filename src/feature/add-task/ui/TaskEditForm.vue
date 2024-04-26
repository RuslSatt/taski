<template>
	<Card v-if="store.task">
		<template #content>
			<div class="card-content">
				<InputText v-model="store.task.name" class="task-name" placeholder="Название задачи" />
				<InputText v-model="store.task.description" class="task-description" placeholder="Описание задачи" />
				<div class="buttons">
					<Button @click="store.toggleVisibleForm" severity="danger" label="Отмена" />
					<Button label="Сохранить" />
				</div>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
import { useEditTaskStore } from '@/feature/edit-task';

const store = useEditTaskStore();

</script>

<style scoped>
.card-content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 5px;
}

.task-name, .task-description {
	border: none;
	box-shadow: none
}

.task-name {
	font-size: 18px;
}

.task-description {
	font-size: 14px;
}

.buttons {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
	margin-top: 5px;
}
</style>
