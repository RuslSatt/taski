export type TaskCategories = 'inbox' | 'today' | 'upcoming';

export interface TaskPriority {
	label: string;
	icon: string;
	color: string;
}

export interface Task {
	id: number;
	user_id: string;
	name: string;
	description?: string;
	due: Date | null;
	priority: TaskPriority | null;
	completed?: boolean;
}
