<template>
	<aside :class="{sidebar: true, hide: themeStore.isHideNavBar}">
		<ul class="sidebar-list">
			<li
				@click="selectItem(item)"
				:class="{'list-item': true, 'list-item-group': item.mode === 'tree', active: item.id === selectedId}"
				v-for="item in items"
				:key="item.id"
			>
				<router-link
					:to="item.path"
					class="list-item-link"
				>
					<i v-if="item.icon" :class="`pi ${item.icon}`"></i>
					<p>{{ item.label }}</p>
					<AddProjectButton class="item-button" v-if="item.id === `project`" />
				</router-link>
			</li>
		</ul>
	</aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '@/entities/theme';
import { AddProjectButton } from '@/feature/add-project';

const themeStore = useThemeStore();

interface Item {
	id: string,
	label: string,
	path: string
	icon?: string,
	children?: Item[],
	mode: ModeItem
}

type ModeItem = 'single' | 'tree'

const items = ref<Item[]>([
	{ id: 'inbox', label: 'Входящие', icon: 'pi pi-inbox', mode: 'single', path: '/inbox' },
	{ id: 'today', label: 'Сегодня', icon: 'pi pi-calendar-clock', mode: 'single', path: '/today' },
	{ id: 'upcoming', label: 'Предстоящие', icon: 'pi pi-calendar', mode: 'single', path: '/upcoming' },
	{ id: 'project', label: 'Проекты', icon: 'pi pi-th-large', children: [], mode: 'tree', path: '/projects' }
]);

const selectedId = ref<string>('1');

const selectItem = (item: Item) => {
	selectedId.value = item.id;
};

</script>

<style scoped>
.sidebar {
	display: flex;
	flex-direction: column;
	border-right: 1px solid var(--surface-300);
	height: 100%;
	min-width: 250px;
	transition: margin-left 0.3s;
}

.sidebar.hide {
	margin-left: -251px;
}

.sidebar-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	flex: 0 0 auto;
	width: 100%;
	height: 100%;
	padding: 10px;
}

.list-item, .list-item-group {
	cursor: pointer;
	width: 100%;
	border-radius: 10px;
	transition: background-color 0.3s, color 0.3s;
}

.list-item-link {
	display: flex;
	align-items: center;
	gap: 10px;
	color: var(--text-color);
	text-decoration: none;
	width: 100%;
	padding: 10px;
	height: 35px;
}

.list-item:hover, .list-item-group:hover {
	background-color: var(--surface-200);
}

.list-item.active {
	color: var(--highlight-text-color);
	background-color: var(--highlight-bg);
}

.list-item-group {
	margin-top: 5px;
}

.item-buttons {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-left: auto;
}

.item-button {
	margin-left: auto;
	width: 24px;
	height: 24px;
}
</style>
