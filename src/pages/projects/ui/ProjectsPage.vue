<template>
	<PageBase>
		<template v-slot:content>
			<h2 class="title">Проекты</h2>
			<AddProjectButton :is-page="true" class="add-project-button" />
			<ProjectList />
			<DeleteProjectModal />
		</template>
	</PageBase>
</template>

<script setup lang="ts">
import { AddProjectButton } from '@/feature/add-project';
import { PageBase } from '@/widgets/page-base';
import { ProjectList } from '@/widgets/project-list';
import { DeleteProjectModal } from '@/feature/actions-project';
</script>

<style scoped>
.title {
	font-size: 24px;
	margin-bottom: 20px;
}
</style>
