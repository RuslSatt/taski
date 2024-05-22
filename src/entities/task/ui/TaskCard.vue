<template>
	<Card v-if="!isEdit" :class="{'td-card': true, completed: task.completed}" @click="handlerClick">
		<template #content>
			<div class="container">
				<div class="info">
					<div class="checkbox-container">
						<slot name="checkbox"></slot>
					</div>
					<div class="content">
						<p v-if="task.name" class="content-name">{{ task.name }}</p>
						<p v-if="task.description" class="content-description">{{ task.description }}</p>
					</div>
					<div class="tools">
						<slot name="tools"></slot>
					</div>
				</div>
				<div v-if="isTag" class="tags">
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

const emit = defineEmits(['clickCard']);

const handlerClick = () => {
	emit('clickCard');
};

const isTag = computed(() => {
	return props.task.due || props.task.project_id || props.task.priority;
});

</script>

<style scoped>
:deep(.p-card-body) {
	padding: 0.8rem
}

.completed .content-name,
.completed .content-description,
.completed .pi {
	color: var(--bluegray-300);
}

.info {
	display: flex;
	align-items: flex-start;
	gap: 15px;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 10px;
	overflow: hidden;
}

.content-name {
	line-height: 16px;
}

.content-description {
	font-size: 12px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	line-height: 14px;
}

.tools {
	display: flex;
	align-self: flex-start;
	justify-content: space-between;
	margin-left: auto;
}

.tags {
	display: flex;
	align-items: center;
	gap: 10px;
	padding-left: 35px;
	margin-top: 10px;
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
