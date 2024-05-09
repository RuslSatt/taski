<template>
	<div class="page">
		<div class="wrapper">
			<div class="content">
				<h2 class="title">Проекты</h2>
				<AddProjectButton :is-page="true" class="add-project-button" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { AddProjectButton } from '@/feature/add-project';
</script>

<style scoped>
.page {
	display: flex;
	width: 100%;
}

.wrapper {
	width: 100%;
	overflow: auto;
}

.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	width: 100%;
	max-width: 700px;
	margin: auto;
}

.add-project-button {
	align-self: flex-start;
}

.title {
	font-size: 24px;
	align-self: flex-start;
	margin-bottom: 20px;
}
</style>
