import { defineStore } from 'pinia';
import type { User } from '@/entities/user/model/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', () => {

	const user = ref<User | undefined>(undefined);

	const router = useRouter();

	function setUser(newUser: User) {
		user.value = newUser;
		localStorage.setItem('user', JSON.stringify(newUser));
	}

	function initUser() {
		const authUser = localStorage.getItem('user');
		if (authUser) {
			user.value = JSON.parse(authUser);
		}
	}

	async function logout() {
		user.value = undefined;
		localStorage.removeItem('user');
		await router.push('/auth');
	}

	return { user, setUser, initUser, logout };
});
