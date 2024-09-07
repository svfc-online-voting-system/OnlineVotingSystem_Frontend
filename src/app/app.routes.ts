import { Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { OtpComponent } from './auth/otp/otp.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: 'Home | votevoyage' },
	{
		path: 'features',
		component: FeaturesComponent,
		title: 'Features | votevoyage',
	},
	{ path: 'auth/login', component: LoginComponent, title: 'Login | votevoyage' },
	{
		path: 'auth/sign-up',
		component: SignupComponent,
		title: 'Signup | votevoyage',
	},
	{
		path: 'auth/forgot-password',
		component: ForgotPasswordComponent,
		title: 'votevoyage | Forgot Password',
	},
	{
		path: 'auth/otp-verification',
		component: OtpComponent,
		title: 'votevoyage | OTP Verification',
	},
];
