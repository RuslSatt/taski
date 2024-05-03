<template>
	<div class="task-page">
		<TaskPageToolbar class="task-header"></TaskPageToolbar>
		<TaskPageFields class="task-fields" />
	</div>
</template>

<script setup lang="ts">

import { TaskPageToolbar } from '@/widgets/task-page-toolbar';
import { TaskPageFields } from '@/widgets/task-page-fields';
</script>

<style scoped>
.task-page {
	background-color: var(--surface-600);
	height: 100%;
	width: 100%;
}
</style>
