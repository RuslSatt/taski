export type TaskCategories = 'inbox' | 'today' | 'upcoming' | 'project';

export interface TaskPriority {
	label: string;
	icon: string;
	color: string;
}

export interface Task {
	id: number;
	user_id: string;
	project_id: number | null;
	name: string;
	description?: string;
	due: Date | null;
	priority: TaskPriority | null;
	completed?: boolean;
}
