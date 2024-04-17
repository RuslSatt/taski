import { defineStore } from 'pinia';
import type { User, UserSchema } from '@/entities/user/model/user';

const initialState: UserSchema = {
	user: undefined
};

export const useUserStore = defineStore('user', {
	state: () => initialState,
	actions: {
		setUser(user: User) {
			this.user = user;
		},
		initUser() {
			const user = localStorage.getItem('user');
			if (user) {
				this.user = JSON.parse(user);
			}
		},
		logout() {
			this.user = undefined;
			localStorage.removeItem('user');
		}
	},
	getters: {
		getUser(): User | undefined {
			return this.user;
		}
	}
});
