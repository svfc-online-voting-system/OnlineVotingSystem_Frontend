import { Injectable } from '@angular/core';
import { environment } from '@app/../environments/environment';
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';
import {
	ApiAuthResponse,
	SignUpInformation,
	ApiAuthErrorResponse,
} from '@app/core/models/authResponseType';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, of, throwError } from 'rxjs';

@Injectable({
	providedIn: 'any',
})
export class AuthService {
	private readonly apiBaseURL = environment.API_BASE_URL;
	private readonly apiPort = environment.API_PORT;
	private readonly apiAuthLoginRoute = environment.API_AUTH_LOGIN_ROUTE;
	private readonly apiCreateAccountRoute =
		environment.API_CREATE_ACCOUNT_ROUTE;
	private readonly apiLogoutRoute = environment.API_LOGOUT_ROUTE;
	private readonly apiVerifyJWT = environment.API_VERIFY_JWT;
	private readonly apiVerifyEmail = environment.API_VERIFY_EMAIL;
	private readonly apiVerifyOTP = environment.API_VERIFY_OTP;
	private readonly apiResendOTP = environment.API_RESEND_OTP;
	constructor(private httpClient: HttpClient, private router: Router) {}

	login(loginInformation: {
		email: string;
		password: string;
	}): Observable<ApiAuthResponse> {
		return this.httpClient.post<ApiAuthResponse>(
			`${this.apiBaseURL}:${this.apiPort}/${this.apiAuthLoginRoute}`,
			loginInformation,
			{ withCredentials: true },
		);
	}

	isTokenValid(): Observable<ApiAuthResponse | ApiAuthErrorResponse> {
		return this.httpClient
			.get<ApiAuthResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiVerifyJWT}`,
				{
					withCredentials: true,
				},
			)
			.pipe(
				catchError((error: HttpErrorResponse) => {
					if (error.status === 401) {
						return of({
							error: error.error,
						} as ApiAuthErrorResponse);
					}
					throw error;
				}),
			);
	}

	verifyOTP(otp: string, email: string): Observable<ApiAuthResponse> {
		const data = {
			email: email,
			otp_code: otp,
		};
		return this.httpClient
			.patch<ApiAuthResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiVerifyOTP}`,
				data,
				{ withCredentials: true },
			)
			.pipe();
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
				},
			),
		);
	}

	verifyEmail(token: string): Promise<ApiAuthResponse> {
		if (token.length !== 171 || !token) {
			return Promise.reject('Invalid token.');
		}

		return lastValueFrom(
			this.httpClient.get<ApiAuthResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiVerifyEmail}/${token}`,
				{ withCredentials: true },
			),
		);
	}

	logoutSession(): Observable<ApiAuthResponse> {
		const csrfToken = this.getCookie('X-CSRF-TOKEN');
		const refreshToken = this.getCookie('csrf_refresh_token');

		if (!csrfToken || !refreshToken) {
			return throwError(() => new Error('Missing CSRF tokens'));
		}

		const headers = new HttpHeaders({
			'X-CSRF-TOKEN': csrfToken,
			'csrf-refresh-token': refreshToken,
		});

		return this.httpClient.post<ApiAuthResponse>(
			`${this.apiBaseURL}:${this.apiPort}/${this.apiLogoutRoute}`,
			{},
			{
				headers,
				withCredentials: true,
			},
		);
	}

	resendOTP(email: string): Observable<ApiAuthResponse> {
		return this.httpClient.patch<ApiAuthResponse>(
			`${this.apiBaseURL}:${this.apiPort}/${this.apiResendOTP}/${email}`,
			{},
			{ withCredentials: true },
		);
	}

	private getCookie(name: string): string | null {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) {
			return parts.pop()?.split(';').shift() ?? null;
		}
		return null;
	}
}
