<template>
	<CommentItem
		v-for="comment in comments"
		:key="comment.id"
		:comment="comment"
	>
	</CommentItem>
</template>

<script setup lang="ts">

import { type Comment, CommentItem } from '@/entities/comment';

defineProps<{
	comments: Comment[]
}>();

</script>

<style scoped>

</style>
