<template>
	<div class="home">
		<p>Home page</p>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/entities/user';
import { useRouter } from 'vue-router';

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

</style>
