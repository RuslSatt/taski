<template>
	<aside :class="{sidebar: true, hide: themeStore.isHideNavBar}">
		<ul class="sidebar-list">
			<li
				:class="{'list-item': true, }"
				v-for="item in menuStore.items"
				:key="item.id"
			>
				<router-link
					:to="item.path"
					:class="{'list-item-link': true, active: item.id === menuStore.selectedId }"
				>
					<i v-if="item.icon" :class="`pi ${item.icon}`"></i>
					<p>{{ item.label }}</p>
					<AddProjectButton class="item-button" v-if="item.id === `projects`" />
				</router-link>

				<ul v-if="item.children?.length">
					<li
						@click.stop="selectProject(child)"
						v-for="child in item.children"
						:class="{'list-item-link': true, active: child.id === menuStore.selectedId }"
					>
						<p>{{ child.label }}</p>
					</li>
				</ul>
			</li>
		</ul>
	</aside>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/entities/theme';
import { AddProjectButton } from '@/feature/add-project';
import { type MenuItem, useMenuStore } from '@/entities/menu';
import { useProjectStore } from '@/entities/project';

const themeStore = useThemeStore();
const menuStore = useMenuStore();
const projectStore = useProjectStore();

const selectProject = (item: MenuItem) => {
	const project = projectStore.getProjectById(item.id);
	if (project) projectStore.setProject(project);
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
	width: 100%;
}

.list-item-link {
	cursor: pointer;
	display: flex;
	align-items: center;
	border-radius: 10px;
	gap: 10px;
	color: var(--text-color);
	text-decoration: none;
	width: 100%;
	padding: 10px;
	height: 35px;
	//transition: background-color 0.3s, color 0.3s;
}

.list-item-link:hover, .list-item-group:hover {
	background-color: var(--surface-200);
}

.list-item-link.active {
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
