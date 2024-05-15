<template>
	<Button
		@click="toggleUserMenu"
		severity="secondary"
		rounded
		label="R"
		class="avatar"
	/>
	<Menu ref="userMenu" :model="items" :popup="true" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/entities/user';

const userStore = useUserStore();

const items = ref([
	{
		label: 'Профиль',
		icon: 'pi pi-user'
	},
	{
		label: 'Настройки',
		icon: 'pi pi-cog'
	},
	{
		label: 'Выход',
		icon: 'pi pi-sign-out',
		command: () => onLogout()
	}
]);

const userMenu = ref();

const toggleUserMenu = (event: Event) => {
	userMenu.value.toggle(event);
};

const onLogout = () => {
	userStore.logout();
};
</script>

<style scoped>

</style>
