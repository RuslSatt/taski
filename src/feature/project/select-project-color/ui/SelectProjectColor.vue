<template>
	<div class="buttons">
		<ButtonColor
			v-for="color of colors"
			:key="color.name"
			:class="{button: true, active: color.color === projectStore.color}"
			:style="color.color === projectStore.color ? {border: `1px solid ${color.color}`} : {}"
			:color="color.color"
			@click.prevent="setColor(color.color)"
		/>
	</div>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/entities/project';
import { colors } from '@/feature/project/select-project-color/model/colors';
import { ButtonColor } from '@/feature/project/select-project-color';

const projectStore = useProjectStore();

const setColor = (color: string) => {
	projectStore.color = color;
};

</script>

<style scoped>
.buttons {
	margin: 5px 0px;
	gap: 10px;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}

.button {
	padding: 3px;
}
</style>
