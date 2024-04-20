<template>
	<aside :class="{sidebar: true, hide: themeStore.isHideNavBar}">
		<ul class="sidebar-list">
			<li
				@click="selectItem(item)"
				:class="{'list-item': true, 'list-item-group': item.mode === 'tree', active: item.id === selectedItem?.id}"
				v-for="item in items"
				:key="item.id"
			>
				<i v-if="item.icon" :class="`pi ${item.icon}`"></i>
				<p>{{ item.label }}</p>
			</li>
		</ul>
	</aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '@/entities/theme';

const themeStore = useThemeStore();

interface Item {
	id: string,
	label: string,
	icon?: string,
	children?: Item[],
	mode: ModeItem
}

type ModeItem = 'single' | 'tree'

const items = ref<Item[]>([
	{ id: '1', label: 'Мои задачи', icon: 'pi pi-check-circle', mode: 'single' },
	{ id: '2', label: 'Проекты', children: [], mode: 'tree' }
]);

const selectedItem = ref<Item | null>(null);

const selectItem = (item: Item) => {
	selectedItem.value = item;
};

</script>

<style scoped>
.sidebar {
	display: flex;
	flex-direction: column;
	border-right: 1px solid var(--surface-300);
	height: 100%;
	width: 250px;
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
	padding: 10px;
	height: 35px;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 10px;
	width: 100%;
	border-radius: 10px;
	transition: background-color 0.3s, color 0.3s;
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
