import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@app/core/interceptors/auth-interceptor';
import { AuthGuard } from '@app/core/guards/auth/auth.guard';

// Services
import { SnackbarService } from '@app/core/services/snackbar/snackbar.service';
import { AuthService } from '@app/core/services/api/auth/auth.service';
import { PollService } from '@app/core/services/api/poll/poll.service';

// Validators
import { LoginValidatorsService } from '@app/core/services/validators/login/login-validators.service';
import { SignupValidatorsService } from '@app/core/services/validators/signup/signup-validators.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule],
	providers: [
		AuthGuard,
		SnackbarService,
		LoginValidatorsService,
		SignupValidatorsService,
		AuthService,
		PollService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	exports: [ReactiveFormsModule, CommonModule],
})
export class CoreModule {}
export {
	AuthService,
	SnackbarService,
	LoginValidatorsService,
	SignupValidatorsService,
	PollService,
};
