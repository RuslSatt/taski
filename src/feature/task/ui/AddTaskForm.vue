<template>
	<Card class="card">
		<template #content>
			<div class="card-content">
				<InputText v-model="taskStore.name" class="task-name" placeholder="Название задачи" />
				<InputText v-model="taskStore.description" class="task-description" placeholder="Описание задачи" />
				<div class="buttons">
					<Button severity="danger" label="Отмена" />
					<Button @click="taskStore.addTask" label="Добавить" />
				</div>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();

</script>

<style scoped>
.card {
	width: 100%;
	margin-top: 10px;
	margin-bottom: 10px;
	border: 1px solid var(--surface-300);
}


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
}
</style>
