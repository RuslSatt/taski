import dayjs from 'dayjs';

export function isChangedName(nameOne: string, nameTwo: string): boolean {
	return nameOne !== nameTwo;
}

export function isChangedDescription(descriptionOne?: string, descriptionTwo?: string): boolean {
	return descriptionOne !== descriptionTwo;
}

export function isChangedDate(dateOne: Date | string | null, dateTwo: Date | string | undefined | null): boolean {
	if (!dateOne && !dateTwo) return false;

	return !dayjs(dateOne).isSame(dayjs(dateTwo), 'day');
}

export function isChangedProjectId(projectIdOne: number | null, projectIdTwo: number | undefined | null): boolean {
	if (!projectIdOne && !projectIdTwo) return false;

	return projectIdOne !== projectIdTwo;
}

export function isChangedPriority(priorityOne: string | undefined, priorityTwo: string | undefined | null): boolean {
	if (!priorityOne && !priorityTwo) return false;

	return priorityOne !== priorityTwo;
}
