import { Routes, RouterModule } from '@angular/router';
import { HomeComponent as LandingPage } from './home/home.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guard/auth/auth.guard';
import { NotFoundComponent } from '@app/404/404.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';

export const routes: Routes = [
	{ path: '', component: LandingPage, title: 'Home | votevoyage' },
	{
		path: 'auth/login',
		title: 'Login | votevoyage',
		loadComponent: () =>
			import('@app/auth/login/login.component').then(
				(m) => m.LoginComponent,
			),
	},
	{
		path: 'auth/sign-up',
		title: 'Signup | votevoyage',
		loadComponent: () =>
			import('@app/auth/signup/signup.component').then(
				(m) => m.SignupComponent,
			),
	},
	{
		title: 'votevoyage | Forgot Password',
		path: 'auth/forgot-password',
		loadComponent: () =>
			import('@app/auth/forgot-password/forgot-password.component').then(
				(m) => m.ForgotPasswordComponent,
			),
	},
	{
		title: 'votevoyage | OTP Verification',
		path: 'auth/otp-verification',
		loadComponent: () =>
			import('@app/auth/otp/otp.component').then((m) => m.OtpComponent),
	},
	{
		title: 'votevoyage | Verify your email',
		path: 'auth/verify-email/:token',
		component: VerifyEmailComponent,
	},
	{
		path: 'u/home',
		title: 'votevoyage Home | User',
		loadComponent: () =>
			import('@app/authenticated/user/home/home.component').then(
				(m) => m.UserHomeComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/home',
		title: 'votevoyage Home | Admin',
		loadComponent: () =>
			import('@app/authenticated/admin/home/home.component').then(
				(m) => m.AdminHomeComponent,
			),
		// canActivate: [AuthGuard], // Uncomment this line to enable auth guard after testing
	},
	{
		path: '**',
		component: NotFoundComponent,
		title: '404 | Oh no!',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
