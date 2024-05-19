<template>
	<Dropdown
		class="dropdown"
		placeholder="Проект"
		:options="projectStore.projects"
		v-model="taskStore.project"
		showClear
		optionLabel="name"
		@update:modelValue="handlerUpdate"
		emptyMessage="Нет проектов"
	>
		<template #value="slotProps">
			<div v-if="slotProps.value" class="dropdown-item">
				<i :class="`pi ${slotProps.value.icon} ${slotProps.value?.color}`"></i>
				<div :class="`item-label ${slotProps.value.color}`">{{ slotProps.value.name }}</div>
			</div>
			<span v-else>
				{{ slotProps.placeholder }}
			</span>
		</template>
		<template #option="slotProps">
			<div class="dropdown-item">
				<i :class="`pi ${slotProps.option.icon} ${slotProps.option.color}`"></i>
				<div :class="`item-label ${slotProps.option.color}`">{{ slotProps.option.name }}</div>
			</div>
		</template>
	</Dropdown>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/entities/task';
import { useProjectStore } from '@/entities/project';

const projectStore = useProjectStore();
const taskStore = useTaskStore();

const emit = defineEmits(['update']);

const handlerUpdate = () => {
	emit('update');
};

</script>

<style scoped>
.dropdown {
	display: flex;
	align-items: center;
	width: 100%;
}

.dropdown-item {
	display: flex;
	align-items: center;
	gap: 5px;
}

.red {
	color: var(--red-500);
}

.orange {
	color: var(--orange-500);
}

.green {
	color: var(--green-500);
}
</style>
