<template>
	<Panel class="comment" toggleable>
		<template #icons>

		</template>
		<p class="comment-text">
			{{ comment.text }}
		</p>
	</Panel>
</template>

<script setup lang="ts">
import type { Comment } from '@/entities/comment';

defineProps<{
	comment: Comment;
}>();
</script>

<style scoped>

</style>
