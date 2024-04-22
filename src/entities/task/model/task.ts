export interface Task {
	id: string;
	userId: string;
	name: string;
	description?: string;
	completed?: boolean;
}

export interface TaskInput {
	userId: string;
	name: string;
	description?: string;
}
