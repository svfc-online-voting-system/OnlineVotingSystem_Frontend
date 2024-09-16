import { Injectable } from '@angular/core';
import { environment } from '@app/environment/environment';
import { HttpClient } from '@angular/common/http';
import {
	ApiAuthResponse,
	SignUpInformation,
} from '@app/types/authResponseType';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private apiBaseURL = environment.API_BASE_URL;
	private apiPort = environment.API_PORT;
	private apiAuthLoginRoute = environment.API_AUTH_LOGIN_ROUTE;
	private apiCreateAccountRoute = environment.API_CREATE_ACCOUNT_ROUTE;
	private apiLogoutRoute = environment.API_LOGOUT_ROUTE;
	constructor(private httpClient: HttpClient, private router: Router) {}

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

	isTokenValid(): boolean {
		const token = this.getTokenFromCookie();
		if (!token) {
			return false;
		}
		// TODO: Add serverside endpoint for checking.
		return true;
	}

	getTokenFromCookie(): string | null {
		const name = 'auth-token=';
		const decodedCookie = decodeURIComponent(document.cookie);
		const cookiesArray = decodedCookie.split(';');

		const foundCookie = cookiesArray.find(
			(cookie) => cookie.trim().indexOf(name) === 0
		);

		return foundCookie ? foundCookie.substring(name.length) : null;
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
