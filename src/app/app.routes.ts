import { Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpComponent } from './otp/otp.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: 'Home | votevoyage' },
	{
		path: 'features',
		component: FeaturesComponent,
		title: 'Features | votevoyage',
	},
	{ path: 'login', component: LoginComponent, title: 'Login | votevoyage' },
	{
		path: 'sign-up',
		component: SignupComponent,
		title: 'Signup | votevoyage',
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent,
		title: 'votevoyage | Forgot Password',
	},
	{
		path: 'otp-verification',
		component: OtpComponent,
		title: 'votevoyage | OTP Verification',
	},
];
