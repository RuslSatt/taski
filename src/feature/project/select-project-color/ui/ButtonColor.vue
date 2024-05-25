<template>
	<Button
		severity="secondary"
		text
		class="button"
	>
		<div :style="{backgroundColor: color}" class="button-color-block"></div>
	</Button>
</template>

<script setup lang="ts">

const props = defineProps<{
	color?: string,
}>();

</script>

<style scoped>
.button {
	padding: 3px;
}

.button-color-block {
	width: 20px;
	height: 20px;
	border-radius: 50%;
}
</style>
