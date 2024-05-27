import { defineStore } from 'pinia';
import { ref } from 'vue';
import { type User, useUserStore } from '@/entities/user';
import { supabase } from '@/shared/api/supabase';
import { useRouter } from 'vue-router';
import type { AuthError } from '@supabase/supabase-js';

export const useAuthStore = defineStore('auth', () => {
	const email = ref('');
	const password = ref('');
	const isLoading = ref(false);
	const errorMessage = ref('');

	const userStore = useUserStore();
	const router = useRouter();

	async function signUp() {
		isLoading.value = true;

		const { data, error } = await supabase.auth.signUp({
			email: email.value,
			password: password.value
		});

		await handlerResponse(data?.user, error);
	}

	async function signIn() {
		isLoading.value = true;

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email.value,
			password: password.value
		});

		await handlerResponse(data?.user, error);
	}

	/**
	 * Обработка авторизации пользователя после получения ответа от сервера
	 * @param user - Пользователь
	 * @param error - Ошибка
	 */
	async function handlerResponse(user: User | null, error?: AuthError | null) {
		if (user) {
			userStore.setUser(user);
			await router.push('/');
			$reset();
		} else if (error) {
			errorMessage.value = error.message;
		}

		isLoading.value = false;
	}

	async function signOut() {
		isLoading.value = true;
		const { error } = await supabase.auth.signOut({});
		if (error) errorMessage.value = error.message;
		isLoading.value = false;
	}

	function $reset() {
		email.value = '';
		password.value = '';
		isLoading.value = false;
		errorMessage.value = '';
	}

	return { email, password, isLoading, errorMessage, signUp, signIn, signOut, $reset };
});
