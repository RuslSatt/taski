<template>
	<div class="skeleton">
		<div class="skeleton-item">
			<Skeleton width="100%"></Skeleton>
			<Skeleton width="100%"></Skeleton>
			<Skeleton width="100%"></Skeleton>
		</div>
		<div class="skeleton-item">
			<Skeleton width="100%"></Skeleton>
			<Skeleton width="100%"></Skeleton>
			<Skeleton width="100%"></Skeleton>
		</div>
		<div class="skeleton-item">
			<Skeleton width="100%"></Skeleton>
			<Skeleton width="100%"></Skeleton>
			<Skeleton width="100%"></Skeleton>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.skeleton, .skeleton-item {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 20px;
}

.skeleton-item {
	gap: 10px;
}
</style>
