import { Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
	{ path: '', component: AppComponent, title: 'Coming Soon' },
	{ path: 'features', component: FeaturesComponent, title: 'Features' },
];
