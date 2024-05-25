<template>
	<Tag
		class="tag"
		:value="value"
		@click.stop="routeToProjectPage"
		severity="secondary"
		:style="{color: currentProject?.color}"
	/>
</template>

<script setup lang="ts">
import type { Task } from '@/entities/task';
import { computed, ref } from 'vue';
import { useProjectStore } from '@/entities/project';
import { useRoute } from 'vue-router';


const projectStore = useProjectStore();
const currentProject = ref();

const props = defineProps<{
	task: Task
}>();

const route = useRoute();

const value = computed(() => {
	if (props.task.project_id) {
		const project = projectStore.getProjectById(props.task.project_id);
		if (project) {
			currentProject.value = project;
			return project.name;
		}
	}
});

const routeToProjectPage = async () => {
	if (!route.params.id) await projectStore.setProject(currentProject.value);
};
</script>

<style scoped>
.tag {
	margin-left: auto;
}

.completed .p-tag {
	color: var(--bluegray-300);
}
</style>
