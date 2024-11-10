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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import {
	MatCheckboxModule,
	type MatCheckbox,
} from '@angular/material/checkbox';
import {
	ApiAuthResponse,
	type ApiAuthErrorResponse,
} from '@app/core/models/authResponseType';
import { SnackbarService } from '@app/core/core.module';
import { timeout } from 'rxjs';

@Component({
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
		MatStepperModule,
		FormsModule,
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
	email = '';
	constructor() {
		this.isBrowser = isPlatformBrowser(this._platformId);
	}

	loginFormGroup = this._formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
		showPasswordCheckbox: [false],
	});

	otpFormGroup = this._formBuilder.group({
		otp: [
			'',
			[
				Validators.required,
				Validators.pattern('^[0-9]{7}$'),
				Validators.minLength(7),
				Validators.maxLength(7),
			],
		],
	});

	togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}

	submitLoginForm(stepper: MatStepper): void {
		if (this.isBrowser && this.loginFormGroup.valid) {
			const { email, password } = this.loginFormGroup.value;
			this.isLoggingIn = true;

			this._authService
				.login({ email: email!, password: password! })
				.subscribe({
					next: (response: ApiAuthResponse) => {
						this._snackBarService.showSnackBar(response.message);
						this.email = email!;
						stepper.next();
					},
					error: (error: ApiAuthErrorResponse) => {
						this._snackBarService.showSnackBar(error.error.message);
						this.isLoggingIn = false;
					},
					complete: () => {
						this.isLoggingIn = false;
					},
				});
		}
	}

	submitOtpForm(): void {
		console.log('Submitted');
		if (this.otpFormGroup.valid) {
			const otp = String(this.otpFormGroup.value.otp);

			this._authService
				.verifyOTP(otp, this.email)
				.pipe(timeout(15000))
				.subscribe({
					next: (response: ApiAuthResponse) => {
						if (response.code === 'success') {
							this._snackBarService.showSnackBar('OTP verified');
							this._router.navigate(['/u/home']);
						} else {
							this._snackBarService.showSnackBar('Invalid OTP');
						}
					},
					error: (error: ApiAuthErrorResponse) => {
						this._snackBarService.showSnackBar(error.error.message);
					},
				});
		}
	}
}
