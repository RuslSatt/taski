<template>
	<header class="navbar">
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
	height: 40px;
	width: 100%;
	padding: 2px 10px;
	border-bottom: 1px solid var(--surface-300);
}

.avatar {
	margin-left: auto;
}
</style>
