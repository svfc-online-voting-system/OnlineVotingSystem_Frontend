import { RouterLink, Router } from '@angular/router';
import { AuthService } from '@app/core/core.module';
import { Component, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import {
	FormBuilder,
	Validators,
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
	MAT_FORM_FIELD_DEFAULT_OPTIONS,
	MatFormFieldModule,
} from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import {
	MatCheckboxModule,
	type MatCheckbox,
} from '@angular/material/checkbox';
import {
	ApiAuthResponse,
	type ApiAuthErrorResponse,
} from '@app/core/models/authResponseType';
import { SnackbarService } from '@app/core/core.module';
import {
	ErrorStateMatcher,
	ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';

@Component({
	providers: [
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'outline' },
		},
	],
	selector: 'app-login',
	standalone: true,
	imports: [
		NgIf,
		RouterLink,
		MatCardModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		MatStepperModule,
		MatCheckboxModule,
	],
	templateUrl: './login.component.html',
	styleUrl: '../../../../styles/auth_forms_styles/auth_forms.scss',
})
export class LoginComponent {
	private readonly _snackBarService = inject(SnackbarService);
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _authService = inject(AuthService);
	private readonly _router = inject(Router);
	private readonly _platformId = inject(PLATFORM_ID);
	@ViewChild('showPasswordToggler') showPasswordToggler!: MatCheckbox;
	@ViewChild('loginButton') loginButton!: HTMLButtonElement;
	isBrowser: boolean;
	isLoggingIn = false;
	showPassword = false;
	constructor() {
		this.isBrowser = isPlatformBrowser(this._platformId);
	}

	loginFormGroup = this._formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
		showPasswordCheckbox: [false],
	});

	togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}

	async submitLogInForm(): Promise<void> {
		if (this.isBrowser) {
			const loginFormGroupData = this.loginFormGroup.value;
			if (
				this.loginFormGroup.valid &&
				loginFormGroupData.email &&
				loginFormGroupData.password
			) {
				const loginInformation = {
					email: loginFormGroupData.email,
					password: loginFormGroupData.password,
				};
				this.isLoggingIn = true;

				this._authService.login(loginInformation).subscribe({
					next: (response: ApiAuthResponse) => {
						if (response.code === 'otp_sent') {
							this._snackBarService.showSnackBar(
								response.message,
							);
							this._router.navigate(['/auth/otp-verification']);
						} else {
							this._snackBarService.showSnackBar(
								response.message,
							);
						}
					},
					error: (error: ApiAuthErrorResponse) => {
						this._snackBarService.showSnackBar(
							`${error.error.message}`,
						);
						this.loginButton.disabled = false;
					},
					complete: () => {
						this.isLoggingIn = false;
					},
				});
			}
		}
	}
}
