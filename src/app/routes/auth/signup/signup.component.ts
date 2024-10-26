import {
	Component,
	inject,
	PLATFORM_ID,
	ChangeDetectorRef,
} from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
	MAT_FORM_FIELD_DEFAULT_OPTIONS,
	MatFormFieldModule,
} from '@angular/material/form-field';
import {
	ErrorStateMatcher,
	MAT_DATE_LOCALE,
	provideNativeDateAdapter,
	ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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
import {
	SnackbarService,
	SignupValidatorsService,
	AuthService,
} from '@app/core/core.module';
import { SpinnerComponent } from '@app/shared/ui/spinner/spinner.component';
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
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'outline' },
		},
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
	private readonly _signUpValidatorService = inject(SignupValidatorsService);
	private readonly _cdr = inject(ChangeDetectorRef);
	private readonly _dialog = inject(MatDialog);
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
			validators: this.passwordMatchValidator,
		},
	);

	changePasswordVisibility(): void {
		if (this.isBrowser) {
			this.showPassword = !this.showPassword;
			this._cdr.detectChanges();
		}
	}

	passwordMatchValidator(formGroup: FormGroup) {
		const signUpFormGroupValues = formGroup.value;
		const password = signUpFormGroupValues.password;
		const confirmPassword = signUpFormGroupValues.confirmPassword;
		return password === confirmPassword ? null : { mismatch: true };
	}

	checkPasswordMatch(): void {
		if (this.isBrowser) {
			const signUpFormGroupValues = this.signUpFormGroup.value;
			if (
				signUpFormGroupValues.password !==
				signUpFormGroupValues.confirmPassword
			) {
				this.signUpFormGroup.controls['confirmPassword'].setErrors({
					passwordMismatch: true,
				});
				this.signUpFormGroup.controls['password'].setErrors({
					passwordMismatch: true,
				});
			}
		}
	}

	openLoadingDialog(): void {
		if (this.isBrowser) {
			this._dialog.open(SpinnerComponent, {
				data: { message: 'Logging in...' },
			});
		}
	}

	closeLoadingDialog(): void {
		if (this.isBrowser) {
			this._dialog.closeAll();
		}
	}

	async onSignUpFormSubmit(): Promise<void> {
		if (this.isBrowser) {
			if (this.signUpFormGroup.valid) {
				const signUpFormGroupValues = this.signUpFormGroup.value;
				const firstName = signUpFormGroupValues.firstName;
				const lastName = signUpFormGroupValues.lastName;
				const email = signUpFormGroupValues.email;
				const password = signUpFormGroupValues.password;
				const confirmPassword = signUpFormGroupValues.confirmPassword;
				const birthday = signUpFormGroupValues.birthday;
				const dialogTimer = setTimeout(() => {
					this.openLoadingDialog();
				}, 2000);
				this.submitting = true;
				try {
					const response: ApiAuthResponse =
						await this._authService.signUp({
							email: email,
							first_name: firstName,
							last_name: lastName,
							date_of_birth: birthday,
							password: password,
							confirmPassword: confirmPassword,
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
					clearTimeout(dialogTimer);
					this.closeLoadingDialog();
				}
			} else {
				this._snackBarService.showSnackBar(
					'Please check the information you provided.',
				);
			}
		}
	}
}
