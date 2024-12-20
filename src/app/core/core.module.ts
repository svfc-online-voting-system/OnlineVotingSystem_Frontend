import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@app/core/interceptors/auth-interceptor';
import { AuthGuard } from '@app/core/guards/auth/auth.guard';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
	SnackbarService,
	AuthService,
	PollService,
	VotingEventService,
} from '@app/core/services';

import { CookieService } from '@app/core/services/utils/cookie/cookie.service';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule],
	providers: [
		AuthGuard,
		SnackbarService,
		AuthService,
		PollService,
		VotingEventService,
		CookieService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	exports: [ReactiveFormsModule, CommonModule],
})
export class CoreModule {}
export { CookieService };
