<template>
	<div class="home">
		<NavBar />
		<div class="home-content">
			<SideBar />
			<TasksPage />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/entities/user';
import { useRouter } from 'vue-router';
import { NavBar } from '@/widgets/navbar';
import { SideBar } from '@/widgets/sidebar';
import { TasksPage } from '@/pages/tasks';

const userStore = useUserStore();

onMounted(() => {
	userStore.initUser();

	const { user } = userStore;

	if (!user) {
		const router = useRouter();
		router.push('/auth');
	}
});
</script>

<style scoped>
.home {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

.home-content {
	display: flex;
	flex: 1;
}
</style>
