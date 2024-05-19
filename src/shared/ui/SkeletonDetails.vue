<template>
	<div class="skeleton">
		<Skeleton class="skeleton-title" width="100%" height="2rem"></Skeleton>
		<div class="skeleton__fields-container">
			<div class="skeleton__fields">
				<Skeleton width="150px" height="2rem"></Skeleton>
				<Skeleton width="250px" height="2rem"></Skeleton>
			</div>
			<div class="skeleton__fields">
				<Skeleton width="150px" height="2rem"></Skeleton>
				<Skeleton width="250px" height="2rem"></Skeleton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.skeleton {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 10px;
	margin-bottom: 15px;
}

.skeleton__fields-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 10px;
}

.skeleton__fields {
	display: flex;
	width: 100%;
	gap: 50px;
}
</style>
