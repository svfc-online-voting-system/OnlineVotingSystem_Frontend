import { Injectable } from '@angular/core';
import { environment } from '@app/../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
	ApiAuthResponse,
	SignUpInformation,
	ApiAuthErrorResponse,
} from '@app/core/models/authResponseType';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom, Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'any',
})
export class AuthService {
	private apiBaseURL = environment.API_BASE_URL;
	private apiPort = environment.API_PORT;
	private apiAuthLoginRoute = environment.API_AUTH_LOGIN_ROUTE;
	private apiCreateAccountRoute = environment.API_CREATE_ACCOUNT_ROUTE;
	private apiLogoutRoute = environment.API_LOGOUT_ROUTE;
	private apiVerifyJWT = environment.API_VERIFY_JWT;
	private apiVerifyEmail = environment.API_VERIFY_EMAIL;
	private apiVerifyOTP = environment.API_VERIFY_OTP;
	private currentUserSubject = new BehaviorSubject<{ email: string } | null>(
		null,
	);
	private currentUser = this.currentUserSubject.asObservable();

	constructor(private httpClient: HttpClient, private router: Router) {}

	login(loginInformation: {
		email: string;
		password: string;
	}): Observable<ApiAuthResponse> {
		return this.httpClient
			.post<ApiAuthResponse>(
				`${this.apiBaseURL}:${this.apiPort}/${this.apiAuthLoginRoute}`,
				loginInformation,
				{ withCredentials: true },
			)
			.pipe(
				tap((response) => {
					if (response.code === 'otp_sent') {
						this.currentUserSubject.next({
							email: loginInformation.email,
						});
						console.log(loginInformation.email);
						console.log(this.currentUserSubject.value?.email);
					}
				}),
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

	verifyOTP(otp: string): Observable<ApiAuthResponse> {
		console.log(this.currentUserSubject.value?.email);
		const data = {
			email: this.currentUserSubject.value?.email,
			otp_code: otp,
		};
		console.log(`${this.apiBaseURL}:${this.apiPort}/${this.apiVerifyOTP}`);
		return this.httpClient
			.patch<ApiAuthResponse>(
				`https://localhost:5000/auth/otp-verification`,
				data,
				{ withCredentials: true },
			)
			.pipe(
				tap((response) => {
					if (response.code === 'success') {
						this.currentUserSubject.next(null);
					}
				}),
			);
	}

	getCurrentUser(): Observable<{ email: string } | null> {
		return this.currentUserSubject.asObservable();
	}

	clearCurrentUser(): void {
		this.currentUserSubject.next(null);
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
		return this.httpClient.post<ApiAuthResponse>(
			`${this.apiBaseURL}:${this.apiPort}/${this.apiLogoutRoute}`,
			{ withCredentials: true },
		);
	}
}
