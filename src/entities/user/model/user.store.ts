import { defineStore } from 'pinia';
import type { User } from '@/entities/user/model/user';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {

	const user = ref<User | undefined>(undefined);

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

	function removeUser() {
		user.value = undefined;
		localStorage.removeItem('user');
	}

	return { user, removeUser, setUser, initUser };
});
