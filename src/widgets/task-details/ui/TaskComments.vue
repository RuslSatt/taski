<template>
	<CommentItem
		v-for="comment in comments"
		:key="comment.id"
		:comment="comment"
	>
		<template v-slot:actions>
			<ActionsComment :comment="comment" />
		</template>
	</CommentItem>
</template>

<script setup lang="ts">

import { type Comment, CommentItem } from '@/entities/comment';
import { ActionsComment } from '@/feature/actions-comment';

defineProps<{
	comments: Comment[]
}>();

</script>

<style scoped>

</style>
