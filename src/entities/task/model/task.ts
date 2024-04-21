export interface Task {
	id: string;
	name: string;
	description?: string;
}

export interface TaskInput {
	name: string;
	description?: string;
}
