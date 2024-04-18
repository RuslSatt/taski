import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useUserStore } from '@/entities/user';
import { supabase } from '@/shared/api/supabase';

export const useAuthStore = defineStore('auth', () => {
	const email = ref('');
	const password = ref('');
	const isLoading = ref(false);
	const errorMessage = ref('');

	const userStore = useUserStore();

	async function signUp() {
		isLoading.value = true;

		const { data, error } = await supabase.auth.signUp({
			email: email.value,
			password: password.value
		});

		if (data?.user) userStore.setUser(data.user);

		if (error) errorMessage.value = error.message;

		isLoading.value = false;
	}

	async function signIn() {
		isLoading.value = true;

		const { data, error } = await supabase.auth.signInWithPassword({
			email: email.value,
			password: password.value
		});

		if (data?.user) userStore.setUser(data.user);

		if (error) errorMessage.value = error.message;

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
