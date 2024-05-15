<template>
	<form @onsubmit.prevent class="form">
		<ProgressSpinner v-if="authStore.isLoading" aria-label="Загрузка" />
		<div v-else class="form-container">
			<h2 class="form-title">
				{{ title }}
			</h2>
			<InputText id="email" v-model="authStore.email" placeholder="Email" class="form-input" />
			<Password
				v-model="authStore.password"
				:feedback="!isSignIn"
				toggleMask
				placeholder="Password"
				class="form-input"
				aria-label="Password"
			/>
			<Button @click="onSign" class="form-button" :label="labelFormButton" />
			<Button v-if="isSignIn" link class="form-reset-password" label="Забыли пароль?" />
			<div class="form-toggle-sign">
				<span>{{ toggleSignText }}</span>
				<Button @click="toggleTypeSign" link class="form-toggle-sign-btn" :label="isToggleSignButton" />
			</div>
		</div>
	</form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from '@/feature/auth';
import { useUserStore } from '@/entities/user';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

const isSignIn = ref(true);

const toggleTypeSign = () => {
	authStore.$reset();
	isSignIn.value = !isSignIn.value;
};

const title = computed(() => {
	return isSignIn.value ? 'Войти' : 'Регистрация';
});

const labelFormButton = computed(() => {
	return isSignIn.value ? 'Войти' : 'Зарегистрироваться';
});

const toggleSignText = computed(() => {
	return isSignIn.value ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?';
});

const isToggleSignButton = computed(() => {
	return isSignIn.value ? 'Зарегистрироваться' : 'Войти';
});

const onSign = async () => {
	if (isSignIn.value) {
		await authStore.signIn();
	} else {
		await authStore.signUp();
	}
	authStore.$reset();
};

onMounted(() => {
	userStore.initUser();
	if (userStore.user) router.push('/');
});
</script>

<style scoped>
.form {
	display: flex;
	height: 100%;
	width: 100%;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.form-container {
	display: flex;
	flex-direction: column;
	gap: 15px;
	width: 100%;
}

.form-title {
	font-weight: normal;
	font-size: 24px;
}

.form-input {
	width: 100%;
}

.p-password {
	flex-direction: column-reverse;
}

.form-reset-password {
	padding: 1px;
	align-self: flex-start;
	font-size: 14px;
}

.form-toggle-sign {
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 5px;
}

.form-toggle-sign-btn {
	padding: 1px 0;
}
</style>
