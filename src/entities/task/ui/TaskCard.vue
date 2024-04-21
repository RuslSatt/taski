<template>
	<Card class="card">
		<template #content>
			<div class="container">
				<div class="checkbox-container">
					<Checkbox />
				</div>
				<div class="content">
					<p class="content-name">{{ task.name }}</p>
					<p class="content-description">{{ task.description }}</p>
				</div>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
import type { Task } from '@/entities/task';

defineProps<{
	task: Task
}>();
</script>

<style scoped>
.card {
	box-shadow: none;
	border-bottom: 1px solid var(--surface-100);
	width: 100%;
	border-radius: 0;
}

.container {
	display: flex;
	gap: 15px;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.content-description {
	font-size: 14px;
}
</style>
