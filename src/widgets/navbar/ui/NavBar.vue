<template>
	<header class="navbar">
		<Button icon="pi pi-bars" severity="secondary" text rounded aria-label="Bookmark" />
		<Avatar label="R" class="avatar" shape="circle" />
	</header>
</template>

<script setup lang="ts">

</script>

<style scoped>
.navbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 2px 10px 2px 2px;
	border-bottom: 1px solid var(--surface-300);
}
</style>
