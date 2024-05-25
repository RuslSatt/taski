<template>
	<Card
		class="td-card"
		:style="project.color ? {borderLeft: `2px solid ${project.color}`} : {}"
		@click.stop="onClick"
	>
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
import { useProjectStore } from '@/entities/project';

const store = useProjectStore();

const props = defineProps<{
	project: Project
}>();

const onClick = () => {
	store.setProject(props.project);
};

</script>

<style scoped>
:deep(.p-card-body) {
	padding: 0.2rem
}

.info {
	display: flex;
	align-items: center;
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
