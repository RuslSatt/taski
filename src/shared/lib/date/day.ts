import dayjs from 'dayjs';

export function getViewDate(date?: Date): string | undefined {
	if (date) {
		// dayjs.extend(utc);
		// dayjs.extend(timezone);
		// const userZone = dayjs.tz.guess();
		// const utcDate = dayjs.tz(date, userZone);
		return dayjs(date).format('DD.MM.YYYY');
	}
}
