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

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideClientHydration(),
		provideAnimationsAsync(),
		provideHttpClient(
			withFetch(),
			withJsonpSupport(),
			withInterceptorsFromDi(),
		),
		// { provide: HTTP_INTERCEPTORS, useClass: AuthenticatedInterceptor, multi: true }
	],
};
