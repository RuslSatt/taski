export interface Task {
	id: string;
	userId: string;
	name: string;
	description?: string;
	due: Date | null;
	completed?: boolean;
}

export interface TaskInput {
	userId: string;
	name: string;
	description?: string;
	due: Date | null;
}
