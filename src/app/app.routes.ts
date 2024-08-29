import { Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: 'Coming Soon' },
	{ path: 'features', component: FeaturesComponent, title: 'Features' },
	{ path: 'login', component: LoginComponent, title: 'Login' },
	{ path: 'signup', component: SignupComponent, title: 'Signup' },
];
