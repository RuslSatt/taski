<template>
	<aside class="sidebar">
		<div class="sidebar-header">
			<Button
				class="sidebar-toggle-menu"
				icon="pi pi-bars"
				severity="secondary"
				text rounded
				aria-label="Bookmark"
			/>
		</div>
		<ul class="sidebar-list">
			<li
				@click="selectItem(item)"
				:class="{'list-item': true, 'list-item-group': item.mode === 'tree', active: item.id === selectedItem?.id}"
				v-for="item in items"
				:key="item.id"
			>
				<i v-if="item.icon" :class="`pi ${item.icon}`"></i>
				<p>{{ item.label }}</p>
				<div v-if="item.mode === 'tree'" class="item-buttons">
					<Button class="item-button"
							icon="pi pi-plus"
							severity="secondary"
							text rounded
							aria-label="Bookmark"
							@click.stop
					/>
					<Button class="item-button"
							icon="pi pi-angle-down"
							severity="secondary"
							text rounded
							aria-label="Bookmark"
							@click.stop
					/>
				</div>
			</li>
		</ul>
	</aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
	{ id: '2', label: 'Мои проекты', children: [], mode: 'tree' }
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
	width: 250px;
	height: 100%;
}

.sidebar-header {
	display: flex;
	align-items: center;
	height: 40px;
	width: 100%;
}

.sidebar-toggle-menu {
	margin-left: auto;
}

.sidebar-list {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
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
	transition: background-color, color 0.3s;
}

.list-item:hover, .list-item-group:hover {
	background-color: var(--surface-200);
}

.list-item.active {
	color: var(--green-400);
}

.list-item-group {
	font-weight: bold;
	margin-top: 10px;
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
