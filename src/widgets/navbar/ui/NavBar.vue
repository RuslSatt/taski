<template>
	<header class="navbar">
		<Button
			class="sidebar-toggle-menu"
			icon="pi pi-bars"
			severity="secondary"
			text rounded
			aria-label="Bookmark"
			@click="themeStore.toggleShowNavBar"
		/>
		<UserMenu />
	</header>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/entities/theme';
import { UserMenu } from '@/widgets/user-menu';

const themeStore = useThemeStore();
</script>

<style scoped>
.navbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: 2px 10px;
	border-bottom: 1px solid var(--surface-300);
}

.avatar {
	margin-left: auto;
}
</style>
