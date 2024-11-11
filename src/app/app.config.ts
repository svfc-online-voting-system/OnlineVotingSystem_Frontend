import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
	provideHttpClient,
	withFetch,
	withInterceptorsFromDi,
	withJsonpSupport,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
	ErrorStateMatcher,
	ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimations(),
		provideClientHydration(),
		provideAnimationsAsync(),
		provideHttpClient(
			withFetch(),
			withJsonpSupport(),
			withInterceptorsFromDi(),
		),
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { displayDefaultIndicatorType: false },
		},
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'outline' },
		},
	],
};
