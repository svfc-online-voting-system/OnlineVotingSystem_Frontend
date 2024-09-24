/**
 * This file is for declaring interfaces for api response and form of the data that should come from the frontend form
 */

export interface ApiAuthResponse {
	code?: string;
	message: string;
	role?: 'admin' | 'user';
}

export interface ApiAuthErrorResponse {
	error: {
		code: string;
		message: string;
	};
}

export interface SignUpInformation {
	email: string;
	first_name: string;
	last_name: string;
	date_of_birth: Date;
	password: string;
	confirmPassword: string;
}

export interface LoginInformation {
	email: string;
	password: string;
}
