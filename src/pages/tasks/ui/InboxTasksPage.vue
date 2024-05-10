<template>
	<PageBase>
		<template v-slot:content>
			<TasksBaseContent category="inbox" />
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
</script>

<style scoped>
</style>
