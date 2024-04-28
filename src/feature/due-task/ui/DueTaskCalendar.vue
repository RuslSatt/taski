<template>
	<Calendar v-model="templatedisplay" showIcon iconDisplay="input">
		<template #inputicon="{ clickCallback }">
			<Button
				class="button"
				text rounded
				aria-label="Редактировать"
				icon="pi pi-calendar"
				@click="clickCallback"
			/>
		</template>
	</Calendar>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const templatedisplay = ref();
</script>

<style scoped>

:deep(.p-inputtext) {
	display: none
}


</style>
