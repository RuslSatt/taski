import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

export function getViewDate(date?: Date): string | undefined {
	if (date) {
		dayjs.extend(utc);
		dayjs.extend(timezone);
		const userZone = dayjs.tz.guess();
		const utcDate = dayjs.tz(date, userZone);
		return dayjs(utcDate).format('DD.MM.YYYY');
	}
}
