<template>
	<ProgressSpinner class="spinner" v-if="isLoading" aria-label="Загрузка" />
	<div v-else class="home">
		<NavBar />
		<div class="home-content">
			<SideBar />
			<RouterView />
			<ProjectActionModal />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/entities/user';
import { useRouter } from 'vue-router';
import { NavBar } from '@/widgets/navbar';
import { SideBar } from '@/widgets/sidebar';
import { router } from '@/app/router/router';
import { ProjectActionModal } from '@/widgets/project-action-modal';
import { useProjectStore } from '@/entities/project';

const userStore = useUserStore();
const projectStore = useProjectStore();

const isLoading = ref(false);

onMounted(async () => {
	userStore.initUser();

	const { user } = userStore;

	if (!user) {
		const router = useRouter();
		await router.push('/auth');
	} else {
		isLoading.value = true;
		await projectStore.fetchProjects();
		await router.push('/inbox');
		isLoading.value = false;
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

.spinner {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
}
</style>
