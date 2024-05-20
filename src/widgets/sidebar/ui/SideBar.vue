<template>
	<div
		@click.prevent="themeStore.isHideNavBar = true"
		:class="{'sidebar-mask': true, active: !themeStore.isHideNavBar}"
	></div>
	<aside :class="{sidebar: true, hide: themeStore.isHideNavBar}">
		<ul class="sidebar-list">
			<li
				:class="{'list-item': true, }"
				v-for="item in menuStore.items"
				:key="item.id"
			>
				<router-link
					:to="item.path"
					:class="{
						'list-item-link': true,
						active: item.id === menuStore.selectedId,
						disabled: item.id === 'upcoming'
					}"
				>
					<i v-if="item.icon" :class="`pi ${item.icon}`"></i>
					<p>{{ item.label }}</p>
					<div class="item-buttons">
						<AddProjectButton class="item-button" v-if="item.id === `projects`" />
						<Button
							@click.prevent="hide = !hide"
							:class="{'item-button': true, hide: hide }"
							text rounded icon="pi pi-angle-down"
							v-if="item.id === `projects`"
						/>
					</div>
				</router-link>

				<ul class="project-list" :class="{hide: hide }" v-if="item.children?.length">
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
import { ref, watch } from 'vue';
import { useBreakpoints } from '@/shared';

const themeStore = useThemeStore();
const menuStore = useMenuStore();
const projectStore = useProjectStore();

const selectProject = (item: MenuItem) => {
	const project = projectStore.getProjectById(item.id);
	if (project) projectStore.setProject(project);
};

const hide = ref(false);

const { width } = useBreakpoints();

watch(() => width.value, () => {
	themeStore.isHideNavBar = width.value < 768;
});
</script>

<style scoped>
.sidebar {
	display: flex;
	flex-direction: column;
	border-right: 1px solid var(--surface-300);
	height: 100%;
	min-width: 250px;
	background-color: var(--surface-0);
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

.project-list.hide {
	display: none
}

.list-item {
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
}

.list-item-link:hover, .list-item-group:hover {
	background-color: var(--surface-200);
}

.list-item-link.active {
	color: var(--highlight-text-color);
	background-color: var(--highlight-bg);
}

.list-item-link.disabled {
	color: var(--surface-400);
	pointer-events: none;
}

.item-buttons {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-left: auto;
}

.item-button {
	width: 24px;
	height: 24px;
}

.item-button.hide {
	transform: rotate(-90deg);
}

@media (max-width: 769px) {
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}

	.sidebar-mask.active {
		background-color: #0006;
		height: 100%;
		left: 0;
		position: fixed;
		top: 0;
		transition: background-color .5s;
		width: 100%;
		z-index: 10;
	}
}
</style>
