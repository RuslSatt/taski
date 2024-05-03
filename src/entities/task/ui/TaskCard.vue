<template>
	<Card v-if="!isEdit" class="card" @click="$emit('click')">
		<template #content>
			<div class="container">
				<div class="info">
					<div class="checkbox-container">
						<slot name="checkbox"></slot>
					</div>
					<div class="content">
						<p class="content-name">{{ task.name }}</p>
						<p class="content-description">{{ task.description }}</p>
					</div>
					<div class="tools">
						<slot name="tools"></slot>
					</div>
				</div>
				<div class="tags">
					<i v-if="task.priority" :class="`pi ${task.priority?.icon} ${task.priority?.color}`"></i>
					<slot name="tags"></slot>
				</div>
			</div>
		</template>
	</Card>
	<slot v-if="isEdit" name="editForm"></slot>
</template>

<script setup lang="ts">
import type { Task } from '@/entities/task';
import { computed } from 'vue';

const props = defineProps<{
	task: Task
	editTask?: Task | null
	isVisibleEditForm?: boolean
}>();

const isEdit = computed(() => {
	return props.isVisibleEditForm && props.editTask?.id === props.task.id;
});

</script>

<style scoped>
:deep(.p-card-body) {
	padding: 0.8rem
}

.card {
	box-shadow: none;
	border-bottom: 1px solid var(--surface-100);
	width: 100%;
	border-radius: 0;

}

.info {
	display: flex;
	gap: 15px;
	margin-bottom: 10px;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.content-description {
	font-size: 14px;
}

.tools {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	margin-left: auto;
}

.tags {
	display: flex;
	align-items: center;
	gap: 10px;
	padding-left: 35px;
}

.checkbox-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.red {
	color: var(--red-500);
}

.orange {
	color: var(--orange-500);
}

.green {
	color: var(--green-500);
}
</style>
