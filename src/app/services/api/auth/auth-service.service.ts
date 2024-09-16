import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	ApiAuthResponse,
	SignUpInformation,
} from '@app/types/authResponseType';
import { lastValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiBaseURL = process.env['API_BASE_URL'];
	private apiPort = process.env['API_PORT'];
	private apiAuthLoginRoute = process.env['API_AUTH_LOGIN_ROUTE'];
	private apiCreateAccountRoute = process.env['API_CREATE_ACCOUNT_ROUTE'];
	private apiLogoutRoute = process.env['API_LOGOUT_ROUTE'];
	constructor(private httpClient: HttpClient) {}

	login(loginInformation: {
		email: string;
		password: string;
	}): Promise<ApiAuthResponse> {
		return lastValueFrom(
			this.httpClient.post<ApiAuthResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiAuthLoginRoute}`,
				loginInformation,
				{ withCredentials: true }
			)
		);
	}

	signUp({
		email,
		first_name,
		last_name,
		date_of_birth,
		password,
		confirmPassword,
	}: SignUpInformation): Promise<ApiAuthResponse> | Error {
		const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const parsedDate = new Date(date_of_birth);
		const month = parsedDate.getMonth() + 1;
		const day = parsedDate.getDate();
		const formattedDate = `${parsedDate.getFullYear()}-${
			month < 10 ? '0' + month : month
		}-${day < 10 ? '0' + day : day}`;

		if (password !== confirmPassword) {
			return Promise.reject('Password not matched.');
		}
		if (!first_name || !last_name || !email || !emailRegEx.test(email)) {
			return Promise.reject('Invalid input.');
		}
		return lastValueFrom(
			this.httpClient.post<ApiAuthResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiCreateAccountRoute}`,
				{
					email,
					first_name,
					last_name,
					date_of_birth: formattedDate,
					password,
				}
			)
		);
	}

	logoutSession(): Promise<ApiAuthResponse> {
		return lastValueFrom(
			this.httpClient.get<ApiAuthResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiLogoutRoute}`,
				{ withCredentials: true }
			)
		);
	}
}
