<template>
	<Card class="task-edit-modal">
		<template #content>
			<TaskModalContent />
		</template>
	</Card>
</template>

<script setup lang="ts">
import TaskModalContent from './TaskModalContent.vue';
</script>

<style scoped>
.task-edit-modal {
	border: 1px solid var(--surface-300);
}
</style>
