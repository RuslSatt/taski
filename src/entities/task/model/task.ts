export interface TaskPriority {
	label: string;
	icon: string;
	color: string;
}

export interface Task {
	id: string;
	userId: string;
	name: string;
	description?: string;
	due: Date | null;
	priority: TaskPriority | null;
	completed?: boolean;
}

export interface TaskInput {
	userId: string;
	name: string;
	description?: string;
	due: Date | null;
	priority: TaskPriority | null;
}
