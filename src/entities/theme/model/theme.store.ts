import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {

	const isHideNavBar = ref<boolean>(window.innerWidth < 769);

	function toggleShowNavBar() {
		isHideNavBar.value = !isHideNavBar.value;
	}

	return { isHideNavBar, toggleShowNavBar };
});
