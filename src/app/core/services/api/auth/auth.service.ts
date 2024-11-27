import { Injectable, inject } from '@angular/core';
import { environment } from '@app/../environments/environment';
import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from '@angular/common/http';
import {
	ApiAuthResponse,
	SignUpInformation,
} from '@app/core/models/authResponseType';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { lastValueFrom, Observable, of, throwError } from 'rxjs';
import { CookieService } from '@app/core/core.module';

@Injectable({
	providedIn: 'any',
})
export class AuthService {
	private readonly _cookieService = inject(CookieService);
	private readonly _router = inject(Router);
	private readonly _httpClient = inject(HttpClient);
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

	login(loginInformation: {
		email: string;
		password: string;
	}): Observable<ApiAuthResponse> {
		return this._httpClient.post<ApiAuthResponse>(
			`${this.apiBaseURL}:${this.apiPort}/${this.apiAuthLoginRoute}`,
			loginInformation,
		);
	}

	isTokenValid(): Observable<ApiAuthResponse> {
		return this._httpClient
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
							code: error.error.code,
							message: error.error.message,
						});
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
		return this._httpClient
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
		const parsedDate = new Date(date_of_birth);
		const month = parsedDate.getMonth() + 1;
		const day = parsedDate.getDate();
		const formattedDate = `${parsedDate.getFullYear()}-${
			month < 10 ? '0' + month : month
		}-${day < 10 ? '0' + day : day}`;

		if (password !== confirmPassword) {
			return Promise.reject('Password not matched.');
		}
		if (!first_name || !last_name || !email) {
			return Promise.reject('Invalid input.');
		}
		return lastValueFrom(
			this._httpClient.post<ApiAuthResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiCreateAccountRoute}`,
				{
					email,
					firstname: first_name,
					lastname: last_name,
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
			this._httpClient.get<ApiAuthResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiVerifyEmail}/${token}`,
				{ withCredentials: true },
			),
		);
	}

	logoutSession(): Observable<ApiAuthResponse> {
		const csrfToken = this._cookieService.getCookie('X-CSRF-TOKEN');
		const refreshToken =
			this._cookieService.getCookie('csrf_refresh_token');

		if (!csrfToken || !refreshToken) {
			return throwError(() => new Error('Missing CSRF tokens'));
		}

		const headers = new HttpHeaders({
			'X-CSRF-TOKEN': csrfToken,
			'csrf-refresh-token': refreshToken,
		});

		return this._httpClient.post<ApiAuthResponse>(
			`${this.apiBaseURL}:${this.apiPort}/${this.apiLogoutRoute}`,
			{},
			{
				headers,
				withCredentials: true,
			},
		);
	}

	resendOTP(email: string): Observable<ApiAuthResponse> {
		return this._httpClient.patch<ApiAuthResponse>(
			`${this.apiBaseURL}:${this.apiPort}/${this.apiResendOTP}`,
			{ email: email }, // Send email in the body
			{ withCredentials: true },
		);
	}

	getCookie(name: string): string | null {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) {
			return parts.pop()?.split(';').shift() ?? null;
		}
		return null;
	}
}
