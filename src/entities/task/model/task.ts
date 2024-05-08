export type TaskCategories = 'inbox' | 'today' | 'upcoming';

export interface TaskPriority {
	label: string;
	icon: string;
	color: string;
}

export interface Task {
	id: number;
	userId: string;
	name: string;
	description?: string;
	due: Date | null;
	priority: TaskPriority | null;
	completed?: boolean;
}
