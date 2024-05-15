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
		icon: 'pi pi-sign-out'
	}
]);

const userMenu = ref();

const toggleUserMenu = (event: Event) => {
	userMenu.value.toggle(event);
};
</script>

<style scoped>

</style>
