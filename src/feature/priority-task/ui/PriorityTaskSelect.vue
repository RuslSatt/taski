<template>
	<Dropdown
		class="dropdown"
		placeholder="Приоритет"
		:options="models"
		v-model="taskStore.priority"
		showClear
		optionLabel="label"
		@update:modelValue="handlerUpdate"
	>
		<template #value="slotProps">
			<div v-if="slotProps.value" class="dropdown-item">
				<i :class="`pi ${slotProps.value.icon} ${slotProps.value?.color}`"></i>
				<div :class="`item-label ${slotProps.value.color}`">{{ slotProps.value.label }}</div>
			</div>
			<span v-else>
				{{ slotProps.placeholder }}
			</span>
		</template>
		<template #option="slotProps">
			<div class="dropdown-item">
				<i :class="`pi ${slotProps.option.icon} ${slotProps.option.color}`"></i>
				<div :class="`item-label ${slotProps.option.color}`">{{ slotProps.option.label }}</div>
			</div>
		</template>
	</Dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { priorities } from '../model/priorities';
import { useTaskStore } from '@/entities/task';

const taskStore = useTaskStore();

const models = ref(priorities);

const emit = defineEmits(['update']);

const handlerUpdate = () => {
	emit('update');
};

</script>

<style scoped>
.dropdown {
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
