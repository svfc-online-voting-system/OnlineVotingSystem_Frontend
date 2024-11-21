import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class CookieService {
	getCookie(name: string): string {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) {
			return parts.pop()?.split(';').shift() ?? '';
		}
		return '';
	}
}
