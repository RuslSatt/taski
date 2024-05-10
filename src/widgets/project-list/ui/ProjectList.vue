<template>
	<ul class="list">
		<SkeletonList v-if="projectStore.isLoading" class="skeleton" />
		<ProjectCard
			v-else
			v-for="project in projectStore.projects"
			:project="project"
			:key="project.id"
		>
		</ProjectCard>
	</ul>
</template>

<script setup lang="ts">

import { SkeletonList } from '@/shared';
import { ProjectCard, useProjectStore } from '@/entities/project';
import { onMounted } from 'vue';

const projectStore = useProjectStore();

onMounted(() => {
	projectStore.fetchProjects();
});
</script>

<style scoped>
.list {
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 100%;
	margin-top: 20px;
}
</style>
