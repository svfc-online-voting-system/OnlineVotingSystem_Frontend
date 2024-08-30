import { Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: 'Coming Soon' },
	{ path: 'features', component: FeaturesComponent, title: 'Features' },
	{ path: 'login', component: LoginComponent, title: 'Login' },
	{ path: 'sign-up', component: SignupComponent, title: 'Signup' },
	{
		path: 'forgot-password',
		component: ForgotPasswordComponent,
		title: 'Forgot Password',
	},
];
