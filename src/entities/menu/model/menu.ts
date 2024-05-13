export interface MenuItem {
	id: number | string,
	label: string,
	path: string
	icon?: string,
	children?: MenuItem[],
	mode?: ModeItem
}

export type ModeItem = 'single' | 'tree'
