<template>
	<div class="page">
		<div class="wrapper">
			<div class="content">
				<slot name="content"></slot>
			</div>
		</div>
		<slot name="details"></slot>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page {
	display: flex;
	width: 100%;
}

.wrapper {
	width: 100%;
	overflow: hidden auto;
}

.content {
	padding: 20px;
	width: 100%;
	max-width: 700px;
	margin: 0 auto;
}
</style>
