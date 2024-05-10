<template>
	<Card class="card">
		<template #content>
			<div class="container">
				<div class="info">
					<div class="content">
						<p v-if="project.name" class="content-name">{{ project.name }}</p>
					</div>
					<div class="tools">
						<slot name="tools"></slot>
					</div>
				</div>
			</div>
		</template>
	</Card>
</template>

<script setup lang="ts">
import type { Project } from '../model/project';

defineProps<{
	project: Project
}>();
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
	transition: box-shadow 0.3s;
}

.card:hover {
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
	cursor: pointer;
}

.info {
	display: flex;
	gap: 15px;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 10px;
	overflow: hidden;
	padding: 5px;
}

.tools {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	margin-left: auto;
}
</style>
