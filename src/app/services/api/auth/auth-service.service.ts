import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiLoginResponse } from '@app/types/authResponseType';
import { lastValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiBaseURL = 'http://127.0.0.1';
	private apiPort = '5000';
	private apiAuthLoginRoute = 'auth/login';
	private createAccountRoute = 'auth/create-account';
	private apiLogoutRoute = 'auth/logout';
	constructor(private httpClient: HttpClient) {}

	login(loginInformation: {
		email: string;
		password: string;
	}): Promise<apiLoginResponse> {
		return lastValueFrom(
			this.httpClient.post<apiLoginResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiAuthLoginRoute}`,
				loginInformation,
				{ withCredentials: true }
			)
		);
	}

	logoutSession(): Promise<apiLoginResponse> {
		return lastValueFrom(
			this.httpClient.get<apiLoginResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiLogoutRoute}`,
				{ withCredentials: true }
			)
		);
	}
}
