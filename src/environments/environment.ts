export const environment = {
	API_BASE_URL: 'https://localhost',
	API_PORT: 5000,

	API_AUTH_LOGIN_ROUTE: 'v1/auth/login',
	API_CREATE_ACCOUNT_ROUTE: 'v1/auth/create-account',
	API_LOGOUT_ROUTE: 'v1/auth/logout',
	API_VERIFY_JWT: 'v1/auth/verify-jwt-identity',
	API_VERIFY_EMAIL: 'v1/auth/verify-email',
	API_VERIFY_OTP: 'v1/auth/otp-verification',
	API_RESEND_OTP: 'v1/auth/generate-otp',

	API_GET_ALL_VOTING_EVENTS: '/v1/admin/get-all-voting-events',
};
