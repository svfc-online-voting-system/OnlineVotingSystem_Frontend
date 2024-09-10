import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
	providers: [provideServerRendering(), provideAnimations()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
