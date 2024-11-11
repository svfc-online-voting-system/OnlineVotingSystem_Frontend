import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
	MAT_DATE_LOCALE,
	provideNativeDateAdapter,
} from '@angular/material/core';
import { RouterLink } from '@angular/router';
import {
	FormBuilder,
	Validators,
	FormsModule,
	FormGroup,
	ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SnackbarService, AuthService } from '@app/core/core.module';
import {
	ApiAuthResponse,
	ApiAuthErrorResponse,
} from '@app/core/models/authResponseType';

@Component({
	selector: 'app-signup',
	standalone: true,
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'en-CA' },
		provideNativeDateAdapter(),
	],
	imports: [
		NgIf,
		MatDatepickerModule,
		MatCardModule,
		RouterLink,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		MatCheckboxModule,
	],
	templateUrl: './signup.component.html',
	styleUrl: '../../../../styles/auth_forms_styles/auth_forms.scss',
})
export class SignupComponent {
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _snackBarService = inject(SnackbarService);
	private readonly _authService = inject(AuthService);
	private readonly _platformId = inject(PLATFORM_ID);
	isBrowser: boolean;
	readonly maximumDate: Date | null;
	showPassword = false;
	submitting = false;

	constructor() {
		this.isBrowser = isPlatformBrowser(this._platformId);
		this.maximumDate = this.isBrowser
			? new Date(new Date().setFullYear(new Date().getFullYear() - 18))
			: null;
	}

	signUpFormGroup = this._formBuilder.group(
		{
			firstName: ['', [Validators.required, Validators.minLength(2)]],
			lastName: ['', [Validators.required, Validators.minLength(2)]],
			birthday: [Date.now(), [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(8)]],
			confirmPassword: [
				'',
				[Validators.required, Validators.minLength(8)],
			],
			showPassword: [false],
		},
		{
			validators: (formGroup: FormGroup) => {
				const password = formGroup.get('password')?.value;
				const confirmPassword = formGroup.get('confirmPassword')?.value;
				if (password !== confirmPassword) {
					formGroup
						.get('confirmPassword')
						?.setErrors({ mismatch: true });
					formGroup.get('password')?.setErrors({ mismatch: true });
				} else {
					formGroup.get('confirmPassword')?.setErrors(null);
					formGroup.get('password')?.setErrors(null);
				}
			},
		},
	);

	togglePasswordVisibility(): void {
		if (this.isBrowser) {
			const signUpFormGroupState = this.signUpFormGroup.value;
			if (signUpFormGroupState.showPassword) {
				this.showPassword = true;
			} else {
				this.showPassword = false;
			}
		}
	}

	checkPasswordMatch(): void {
		const signUpFormGroupValues = this.signUpFormGroup.value;
		if (
			signUpFormGroupValues.password !==
			signUpFormGroupValues.confirmPassword
		) {
			this.signUpFormGroup.controls['confirmPassword'].setErrors({
				mismatch: true,
			});
			this.signUpFormGroup.controls['password'].setErrors({
				mismatch: true,
			});
		} else {
			this.signUpFormGroup.controls['confirmPassword'].setErrors({
				mismatch: null,
			});
			this.signUpFormGroup.controls['password'].setErrors({
				mismatch: null,
			});
		}
	}

	async onSignUpFormSubmit(): Promise<void> {
		if (this.isBrowser) {
			if (this.signUpFormGroup.valid) {
				const signUpFormGroupValues = this.signUpFormGroup.value;
				const {
					firstName,
					lastName,
					email,
					password,
					confirmPassword,
					birthday,
				} = signUpFormGroupValues;
				this.submitting = true;
				try {
					const response: ApiAuthResponse =
						await this._authService.signUp({
							email,
							first_name: firstName,
							last_name: lastName,
							date_of_birth: birthday,
							password,
							confirmPassword,
						});
					this._snackBarService.showSnackBar(response.message);
				} catch (error: unknown) {
					console.log(error);
					let errorMessage = 'An error occurred.';
					const errorObj = error as ApiAuthErrorResponse;
					errorMessage = errorObj.error.message;
					this._snackBarService.showSnackBar(errorMessage);
				} finally {
					this.submitting = false;
				}
			}
		}
	}
}
