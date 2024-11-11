import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@app/core/guards/auth/auth.guard';
import { HomeComponent } from '@app/routes/home/home.component';

export const routes: Routes = [
	{
		path: '',
		title: 'Home | votevoyage',
		component: HomeComponent,
	},
	{
		path: 'auth/login',
		title: 'Login | votevoyage',
		loadComponent: () =>
			import('@app/routes/auth/login/login.component').then(
				(m) => m.LoginComponent,
			),
	},
	{
		path: 'auth/sign-up',
		title: 'Signup | votevoyage',
		loadComponent: () =>
			import('@app/routes/auth/signup/signup.component').then(
				(m) => m.SignupComponent,
			),
	},
	{
		title: 'votevoyage | Forgot Password',
		path: 'auth/forgot-password',
		loadComponent: () =>
			import(
				'@app/routes/auth/forgot-password/forgot-password.component'
			).then((m) => m.ForgotPasswordComponent),
	},
	{
		title: 'votevoyage | Verify your email',
		path: 'auth/verify-email/:token',
		loadComponent: () =>
			import('@app/routes/auth/verify-email/verify-email.component').then(
				(m) => m.VerifyEmailComponent,
			),
	},
	{
		path: 'a/home',
		title: 'votevoyage Home | Admin',
		loadComponent: () =>
			import('@app/routes/admin/home/home.component').then(
				(m) => m.AdminHomeComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/manage-users',
		title: 'votevoyage Manage Users | Admin',
		loadComponent: () =>
			import(
				'@app/routes/admin/manage-users/manage-users.component'
			).then((m) => m.ManageUsersComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/manage-admins',
		title: 'votevoyage Manage Admins | Admin',
		loadComponent: () =>
			import(
				'@app/routes/admin/manage-admins/manage-admins.component'
			).then((m) => m.ManageAdminsComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/manage-elections',
		title: 'votevoyage Manage Elections | Admin',
		loadComponent: () =>
			import(
				'@app/routes/admin/manage-elections/manage-elections.component'
			).then((m) => m.ManageElectionsComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/manage-polls',
		title: 'votevoyage Manage Polls | Admin',
		loadComponent: () =>
			import(
				'@app/routes/admin/manage-polls/manage-polls.component'
			).then((m) => m.ManagePollsComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/monitor-elections',
		title: 'votevoyage Monitor Elections | Admin',
		loadComponent: () =>
			import(
				'@app/routes/admin/monitor-elections/monitor-elections.component'
			).then((m) => m.MonitorElectionsComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/generate-reports',
		title: 'votevoyage Generate Reports | Admin',
		loadComponent: () =>
			import(
				'@app/routes/admin/generate-reports/generate-reports.component'
			).then((m) => m.GenerateReportsComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'a/settings',
		title: 'votevoyage Settings | Admin',
		loadComponent: () =>
			import('@app/routes/admin/settings/settings.component').then(
				(m) => m.SettingsComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/home',
		title: 'votevoyage Home | User',
		loadComponent: () =>
			import('@app/routes/user/home/home.component').then(
				(m) => m.UserHomeComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/contact-us',
		title: 'votevoyage Contact Us | User',
		loadComponent: () =>
			import('@app/routes/user/contact-us/contact-us.component').then(
				(m) => m.ContactUsComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/voting-status',
		title: 'votevoyage Voting Status | User',
		loadComponent: () =>
			import(
				'@app/routes/user/voting-status/voting-status.component'
			).then((m) => m.VotingStatusComponent),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/view-ballot',
		title: 'votevoyage View Ballot | User',
		loadComponent: () =>
			import('@app/routes/user/view-ballot/view-ballot.component').then(
				(m) => m.ViewBallotComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/vote',
		title: 'votevoyage Vote | User',
		loadComponent: () =>
			import('@app/routes/user/vote/vote.component').then(
				(m) => m.VoteComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/settings',
		title: 'votevoyage Settings | User',
		loadComponent: () =>
			import('@app/routes/user/settings/settings.component').then(
				(m) => m.SettingsComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/new/poll',
		title: 'votevoyage New Poll | User',
		loadComponent: () =>
			import('@app/shared/ui/new-poll/new-poll.component').then(
				(m) => m.NewPollComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'u/edit/poll/:id',
		title: 'votevoyage Edit Poll | User',
		loadComponent: () =>
			import('@app/shared/ui/edit-poll/edit-poll.component').then(
				(m) => m.EditPollComponent,
			),
	},
	{
		path: 'u/new/election',
		title: 'votevoyage New Election | User',
		loadComponent: () =>
			import('@app/shared/ui/new-election/new-election.component').then(
				(m) => m.NewElectionComponent,
			),
		canActivate: [AuthGuard],
	},
	{
		path: '**',
		title: '404 | Oh no!',
		loadComponent: () =>
			import('@app/routes/not-found/not-found.component').then(
				(m) => m.NotFoundComponent,
			),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
