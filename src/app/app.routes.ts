import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: 'Home | votevoyage' },
	{
		path: 'auth/login',
		loadComponent: () =>
			import('@app/auth/login/login.component').then(
				(m) => m.LoginComponent
			),
		title: 'Login | votevoyage',
	},
	{
		path: 'auth/sign-up',
		loadComponent: () =>
			import('@app/auth/signup/signup.component').then(
				(m) => m.SignupComponent
			),
		title: 'Signup | votevoyage',
	},
	{
		path: 'auth/forgot-password',
		loadComponent: () =>
			import('@app/auth/forgot-password/forgot-password.component').then(
				(m) => m.ForgotPasswordComponent
			),
		title: 'votevoyage | Forgot Password',
	},
	{
		path: 'auth/otp-verification',
		loadComponent: () =>
			import('@app/auth/otp/otp.component').then((m) => m.OtpComponent),
		title: 'votevoyage | OTP Verification',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
