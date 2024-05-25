<template>
	<PageBase>
		<template v-slot:content>
			<TasksBaseContent
				:title="projectStore.project?.name"
				:description="projectStore.project?.description"
				:color="projectStore.project?.color"
				category="project"
			/>
		</template>
		<template v-slot:details>
			<TaskDetails />
		</template>
	</PageBase>
</template>

<script setup lang="ts">

import { PageBase } from '@/widgets/page-base';
import TasksBaseContent from '@/pages/tasks/ui/TasksBaseContent.vue';
import { TaskDetails } from '@/widgets/task-details';

import { useProjectStore } from '@/entities/project';

const projectStore = useProjectStore();
</script>

<style scoped>
</style>
