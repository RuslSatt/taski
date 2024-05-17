<template>
	<div class="setting-comment">
		<Button text rounded icon="pi pi-cog" @click="toggle" />
		<Menu ref="menu" id="config_menu" :model="items" popup>
			<template #item="{ item, props }">
				<a class="item" v-bind="props.action">
					<span :style="item.style" :class="item.icon" />
					<span :style="item.style" class="ml-2">{{ item.label }}</span>
				</a>
			</template>
		</Menu>
	</div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { type Comment, useCommentStore } from '@/entities/comment';

const props = defineProps<{
	comment: Comment
}>();

const commentStore = useCommentStore();

const menu = ref<any>(null);

const items = ref([
	{
		label: 'Редактировать',
		icon: 'pi pi-pencil',
		command: () => {
			commentStore.selectComment(props.comment);
		}
	},
	{
		label: 'Удалить',
		icon: 'pi pi-trash red',
		style: 'color: var(--red-500)',
		command: () => commentStore.deleteComment(props.comment)
	}
]);

const toggle = (e: Event) => {
	if (menu.value) menu.value.toggle(e);
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
