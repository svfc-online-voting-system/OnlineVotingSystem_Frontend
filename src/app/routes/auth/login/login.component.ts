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
import { ApiAuthResponse } from '@app/core/models/authResponseType';
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
	styleUrls: [
		'../../../../styles/auth_forms_styles/auth_forms.scss',
		'./login.component.scss',
	],
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
	isProcessing = false;
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
				Validators.pattern('^\\d{7}$'),
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
			this.isProcessing = true;

			this._authService
				.login({ email: email!, password: password! })
				.subscribe({
					next: (response: ApiAuthResponse) => {
						this._snackBarService.showSnackBar(response.message);
						this.email = email!;
						stepper.next();
					},
					error: (error: ApiAuthResponse) => {
						this._snackBarService.showSnackBar(error.message);
						this.isProcessing = false;
					},
					complete: () => {
						this.isProcessing = false;
					},
				});
		}
	}

	resendOTP(): void {
		this.isProcessing = true;
		this._authService.resendOTP(this.email).subscribe({
			next: (response: ApiAuthResponse) => {
				this._snackBarService.showSnackBar(response.message);
				this.isProcessing = false;
				this.loginButton.disabled = true;
				this.otpFormGroup.reset();
			},
			error: (error: ApiAuthResponse) => {
				this._snackBarService.showSnackBar(error.message);
				this.isProcessing = false;
			},
		});
	}

	submitOtpForm(): void {
		if (this.otpFormGroup.valid) {
			const otp = this.otpFormGroup.value
				.otp!.toString()
				.padStart(7, '0');
			this.isProcessing = true;

			this._authService
				.verifyOTP(otp, this.email)
				.pipe(timeout(15000))
				.subscribe({
					next: (response: ApiAuthResponse) => {
						if (response.code === 'success') {
							console.log(response.message);
							if (response.message == 'admin') {
								this._router.navigate(['/a/home']);
								this._snackBarService.showSnackBar(
									"OTP verified, you're being redirected to the home page",
								);
							} else {
								this._snackBarService.showSnackBar(
									"OTP verified, you're being redirected to the home page",
								);
								this._router.navigate(['/u/home']);
							}
						} else {
							this._snackBarService.showSnackBar('Invalid OTP');
						}
						this.isProcessing = false;
					},
					error: (error: ApiAuthResponse) => {
						this._snackBarService.showSnackBar(error.message);
						this.isProcessing = false;
					},
				});
		}
	}
}
