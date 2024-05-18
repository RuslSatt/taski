import type { ToastServiceMethods } from 'primevue/toastservice';

export class ToastControl {
	private toast: ToastServiceMethods;

	constructor(toast: ToastServiceMethods) {
		this.toast = toast;
	}

	addSuccessToast(name: string, summary: string) {
		this.toast.add({
			severity: 'success',
			summary: `${summary}`,
			detail: `${name}`,
			life: 3000
		});
	}

	addErrorToast(message: string) {
		this.toast.add({
			severity: 'error',
			summary: `Ошибка выполнения запроса`,
			detail: `${message}`,
			life: 3000
		});
	}
}
