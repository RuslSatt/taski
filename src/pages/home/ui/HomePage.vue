<template>
	<div class="home">
		<NavBar />
		<div class="home-content">
			<SideBar />
			<RouterView />
			<AddProjectModal />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/entities/user';
import { useRouter } from 'vue-router';
import { NavBar } from '@/widgets/navbar';
import { SideBar } from '@/widgets/sidebar';
import router from '@/app/router/router';
import { AddProjectModal } from '@/feature/add-project';

const userStore = useUserStore();

onMounted(() => {
	userStore.initUser();

	const { user } = userStore;

	if (!user) {
		const router = useRouter();
		router.push('/auth');
	} else {
		router.push('/inbox');
	}
});
</script>

<style scoped>
.home {
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;
}

.home-content {
	display: flex;
	flex: 1;
	overflow: hidden;
}
</style>
