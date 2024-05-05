export interface Comment {
	id: string;
	task_id: string;
	text: string;
	isEdit?: boolean;
}

export interface CommentInput {
	text: string;
	task_id: string;
}
