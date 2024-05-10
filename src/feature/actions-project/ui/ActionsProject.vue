<template>
	<div class="setting-comment">
		<Button text rounded icon="pi pi-cog" @click.stop="toggle" />
		<Menu ref="menu" id="config_menu" :model="items" popup>
			<template #item="{ item, props }">
				<a class="item" v-bind="props.action">
					<span :style="item.style" :class="item.icon" />
					<span :style="item.style">{{ item.label }}</span>
				</a>
			</template>
		</Menu>
	</div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { type Project, useProjectStore } from '@/entities/project';

const props = defineProps<{
	project: Project
}>();

const projectStore = useProjectStore();

const menu = ref<any>(null);

const items = ref([
	{
		label: 'Редактировать',
		icon: 'pi pi-pencil',
		command: () => onEdit()
	},
	{
		label: 'Удалить',
		icon: 'pi pi-trash red',
		style: 'color: var(--red-500)',
		command: () => projectStore.toggleVisibleDeleteModal()
	}
]);

const onEdit = () => {
	projectStore.toggleVisibleEditModal();
};

const toggle = (e: Event) => {
	if (menu.value) {
		projectStore.selectProject(props.project);
		menu.value.toggle(e);
	}
};

</script>

<style scoped>
:deep(.p-menu .p-menuitem-link) {
	color: var(--red-500);
}

.item {
	display: flex;
	align-items: center;
	gap: 10px;
}
</style>
