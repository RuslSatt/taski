export interface Comment {
	id: string;
	task_id: string;
	text: string;
}

export interface CommentInput {
	text: string;
	task_id: string;
}
