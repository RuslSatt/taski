import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
	const theme = localStorage.getItem('theme');

	const navbar = theme ? JSON.parse(theme).isHideNavBar : false;

	const isHideNavBar = ref<boolean>(window.innerWidth < 769 || navbar);
	const isCollapsedCompletedTask = ref<boolean>(theme ? JSON.parse(theme).isCollapsedCompletedTask : false);

	function toggleShowNavBar() {
		isHideNavBar.value = !isHideNavBar.value;
		setLocalStorage();
	}

	function toggleCompletedTask() {
		isCollapsedCompletedTask.value = !isCollapsedCompletedTask.value;
		setLocalStorage();
	}

	function setLocalStorage() {
		localStorage.setItem('theme', JSON.stringify({
			isHideNavBar: isHideNavBar.value,
			isCollapsedCompletedTask: isCollapsedCompletedTask.value
		}));
	}

	return { isHideNavBar, isCollapsedCompletedTask, toggleShowNavBar, toggleCompletedTask };
});
