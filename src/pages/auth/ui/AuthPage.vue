<template>
	<div class="auth">
		<div class="auth-container">
			<span class="auth-logo">
				TASKI
			</span>
			<AuthForm />
		</div>
	</div>
</template>

<script setup lang="ts">
import { AuthForm } from '@/feature/auth';
</script>

<style scoped>
.auth {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.auth-container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 400px;
	height: 100vh;
	padding: 10px;
}

.auth-logo {
	font-size: 28px;
	font-weight: bold;
	color: var(--green-500);
}
</style>
