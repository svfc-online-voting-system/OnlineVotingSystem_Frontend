export const environment = {
	API_BASE_URL: 'https://localhost',
	API_PORT: 5000,

	API_AUTH_LOGIN_ROUTE: 'api/v1/auth/login',
	API_CREATE_ACCOUNT_ROUTE: 'api/v1/auth/create-account',
	API_LOGOUT_ROUTE: 'api/v1/auth/logout',
	API_VERIFY_JWT: 'api/v1/auth/verify-jwt-identity',
	API_VERIFY_EMAIL: 'api/v1/auth/verify-email',
	API_VERIFY_OTP: 'api/v1/auth/otp-verification',
	API_RESEND_OTP: 'api/v1/auth/generate-otp',

	API_GET_ALL_VOTING_EVENTS: 'api/v1/admin/get-all-voting-events',

	API_GET_VOTING_EVENT: 'api/v1/voting-event/user/get-voting-event',
	API_GET_ALL_VOTING_EVENTS_USER:
		'api/v1/voting-event/user/get-voting-event-by',

	API_GET_MY_PROFILE: '/api/v1/profile/my-profile',
	API_UPDATE_PROFILE: '/api/v1/profile/update-profile',

	// Casting related routes:
	API_CAST_POLL_VOTE: '/api/v1/respondent/poll/cast',

	// Statistics related routes:
	API_GET_POLL_TALLY: '/api/v1/voting-event/user/get-current-tally',
};
