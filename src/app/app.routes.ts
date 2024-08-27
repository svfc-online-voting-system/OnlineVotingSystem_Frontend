import { Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent, title: 'Coming Soon' },
	{ path: 'features', component: FeaturesComponent, title: 'Features' },
];
