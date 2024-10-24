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
		path: 'a/home',
		title: 'votevoyage Home | Admin',
		loadComponent: () =>
			import('@app/authenticated/admin/home/home.component').then(
				(m) => m.AdminHomeComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/manage-users',
		title: 'votevoyage Manage Users | Admin',
		loadComponent: () =>
			import(
				'@app/authenticated/admin/manage-users/manage-users.component'
			).then((m) => m.ManageUsersComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/manage-admins',
		title: 'votevoyage Manage Adnins | Admin',
		loadComponent: () =>
			import(
				'@app/authenticated/admin/manage-admins/manage-admins.component'
			).then((m) => m.ManageAdminsComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/manage-elections',
		title: 'votevoyage Manage Elections | Admin',
		loadComponent: () =>
			import(
				'@app/authenticated/admin/manage-elections/manage-elections.component'
			).then((m) => m.ManageElectionsComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/monitor-elections',
		title: 'votevoyage Monitor Elections | Admin',
		loadComponent: () =>
			import(
				'@app/authenticated/admin/monitor-elections/monitor-elections.component'
			).then((m) => m.MonitorElectionsComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/generate-reports',
		title: 'votevoyage Generate Reports | Admin',
		loadComponent: () =>
			import(
				'@app/authenticated/admin/generate-reports/generate-reports.component'
			).then((m) => m.GenerateReportsComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/settings',
		title: 'votevoyage Settings | Admin',
		loadComponent: () =>
			import('@app/authenticated/admin/settings/settings.component').then(
				(m) => m.SettingsComponent,
			),
		canActivate: [AuthGuard],
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
		path: 'u/contact-us',
		title: 'votevoyage Contact Us | User',
		loadComponent: () =>
			import(
				'@app/authenticated/user/contact-us/contact-us.component'
			).then((m) => m.ContactUsComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/voting-instructions',
		title: 'votevoyage Voting Instructions | User',
		loadComponent: () =>
			import(
				'@app/authenticated/user/voting-instructions/voting-instructions.component'
			).then((m) => m.VotingInstructionsComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/voting-status',
		title: 'votevoyage Voting Status | User',
		loadComponent: () =>
			import(
				'@app/authenticated/user/voting-status/voting-status.component'
			).then((m) => m.VotingStatusComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/view-ballot',
		title: 'votevoyage View Ballot | User',
		loadComponent: () =>
			import(
				'@app/authenticated/user/view-ballot/view-ballot.component'
			).then((m) => m.ViewBallotComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/vote',
		title: 'votevoyage Vote | User',
		loadComponent: () =>
			import('@app/authenticated/user/vote/vote.component').then(
				(m) => m.VoteComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/settings',
		title: 'votevoyage Settings | User',
		loadComponent: () =>
			import('@app/authenticated/user/settings/settings.component').then(
				(m) => m.SettingsComponent,
			),
		canActivate: [AuthGuard],
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
