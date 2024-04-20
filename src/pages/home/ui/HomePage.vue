<template>
	<div class="home">
		<NavBar />
		<div class="home-content">
			<SideBar />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/entities/user';
import { useRouter } from 'vue-router';
import { NavBar } from '@/widgets/navbar';
import { SideBar } from '@/widgets/sidebar';

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
	flex: 1;
}
</style>
