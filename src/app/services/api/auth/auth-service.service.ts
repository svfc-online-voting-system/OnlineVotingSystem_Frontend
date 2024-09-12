import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiLoginResponse } from '@app/types/loginTypes';

@Injectable({
	providedIn: 'root',
})
export class AuthServiceService {
	private apiBaseURL = 'http://127.0.0.1';
	private apiPort = '5000';
	private apiAuthLoginRoute = 'auth/login';
	constructor(private httpClient: HttpClient) {}

	login(loginInformation: { email: string; password: string }) {
		this.httpClient
			.post<apiLoginResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiAuthLoginRoute}`,
				loginInformation
			)
			.subscribe((response) => {
				localStorage.setItem(
					'auth-token',
					response.authorization_token
				);
				console.log(response);
			});
	}

	logoutSession(): boolean {
		localStorage.removeItem('auth-token');
		if (!localStorage.getItem('auth-token')) {
			return false;
		}
		return true;
	}

	get getCurrentSession(): boolean {
		return !!localStorage.getItem('auth-token');
	}
}
