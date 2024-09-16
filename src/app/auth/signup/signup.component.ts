import {
	Component,
	OnInit,
	inject,
	PLATFORM_ID,
	Inject,
	ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule, type MatInput } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
	MAT_DATE_LOCALE,
	provideNativeDateAdapter,
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
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule, MatCheckbox } from '@angular/material/checkbox';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';
import { SignupValidatorsService } from '@app/services/validators/signup/signup-validators.service';
import { SpinnerComponent } from '@app/shared/ui/spinner/spinner.component';
import { AuthService } from '@app/services/api/auth/auth.service';
import {
	ApiAuthResponse,
	ApiAuthErrorResponse,
} from '@app/types/authResponseType';

@Component({
	selector: 'app-signup',
	standalone: true,
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'en-CA' },
		provideNativeDateAdapter(),
	],
	imports: [
		MatDatepickerModule,
		MatCardModule,
		RouterLink,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		MatStepperModule,
		MatCheckboxModule,
	],
	templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
	@ViewChild('stepper') stepper!: MatStepper;
	@ViewChild('showPasswordToggler') showPasswordToggler!: MatCheckbox;
	@ViewChild('passwordField') passwordField!: MatInput;
	nameFormGroup!: FormGroup;
	birthdayFormGroup!: FormGroup;
	emailPasswordFormGroup!: FormGroup;
	passwordFormGroup!: FormGroup;
	passwordValue = '';
	readonly dialog = inject(MatDialog);
	isBrowser: boolean;
	readonly minInimumDate = new Date(1900, 0, 1);
	readonly maximumDate = new Date(
		new Date().setFullYear(new Date().getFullYear() - 18)
	);

	constructor(
		private _formBuilder: FormBuilder,
		private _snackBarService: SnackbarService,
		private _authService: AuthService,
		private _signUpValidatorService: SignupValidatorsService,
		@Inject(PLATFORM_ID) private platformId: object
	) {
		this.isBrowser = isPlatformBrowser(this.platformId);
	}

	changePasswordValue(event: Event): void {
		const inputElement = event.target as HTMLInputElement;
		this.passwordValue = inputElement.value;
	}

	private _initSignUpFormGroups(): void {
		this.nameFormGroup = this._formBuilder.group({
			firstName: ['', [Validators.required, Validators.minLength(2)]],
			lastName: ['', [Validators.required, Validators.minLength(2)]],
		});

		this.birthdayFormGroup = this._formBuilder.group({
			birthday: [null, [Validators.required, Validators.min(18)]],
		});

		this.emailPasswordFormGroup = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: [
				'',
				[
					Validators.required,
					// this._signUpValidatorService.validatePasswordMatch(
					// 	this.passwordValue
					// ),
				],
			],
		});
	}

	togglePasswordVisibility(): void {
		// TODO: To be implemented...
	}

	checkPasswordMatch(): void {
		if (this.isBrowser) {
			if (
				this.emailPasswordFormGroup.get('password')?.value !==
				this.emailPasswordFormGroup.get('confirmPassword')?.value
			) {
				this._snackBarService.showSnackBar('Passwords do not match.');
			} else {
				this._snackBarService.closeSnackBar();
			}
		}
	}

	ngOnInit(): void {
		this._initSignUpFormGroups();
		if (this.isBrowser) {
			this._initializeBrowserSpecificModules();
		}
	}

	private _initializeBrowserSpecificModules(): void {
		import('@angular/material/datepicker').then(() => {
			this._formBuilder.group({
				birthday: [Date.now(), [Validators.required]],
			});
		});
	}

	openLoadingDialog(): void {
		if (this.isBrowser) {
			this.dialog.open(SpinnerComponent, {
				data: { message: 'Logging in...' },
			});
		}
	}

	closeLoadingDialog(): void {
		if (this.isBrowser) this.dialog.closeAll();
	}

	submitNameForm(): void {
		if (this.isBrowser) {
			const errorMessage = this._signUpValidatorService.validateName(
				this.nameFormGroup
			);
			if (errorMessage) {
				this._snackBarService.showSnackBar(errorMessage);
			} else {
				this._snackBarService.closeSnackBar();
				this.nameFormGroup.markAsUntouched();
			}
		}
	}

	submitBirthdayForm(): void {
		if (this.isBrowser) {
			if (this.birthdayFormGroup.invalid) {
				this._snackBarService.showSnackBar(
					'Please enter your birthday.'
				);
			} else {
				this._snackBarService.closeSnackBar();
				this.birthdayFormGroup.markAsUntouched();
			}
		}
	}
	submitEmailPasswordForm(): void {
		if (this.isBrowser) {
			const errorMessage = this._signUpValidatorService.validateEmail(
				this.emailPasswordFormGroup
			);
			const passWordErrorMessage =
				this._signUpValidatorService.validatePassword(
					this.emailPasswordFormGroup
				);
			if (errorMessage) {
				this._snackBarService.showSnackBar(errorMessage);
			} else if (passWordErrorMessage) {
				this._snackBarService.showSnackBar(passWordErrorMessage);
			} else {
				this._snackBarService.closeSnackBar();
				this.emailPasswordFormGroup.markAsUntouched();
			}
		}
	}

	isInvalidAndTouched(formGroup: FormGroup, controlName: string): boolean {
		const control = formGroup.get(controlName);
		return (
			!!control && control.invalid && (control.dirty || control.touched)
		);
	}

	async onSignUpFormSubmit(): Promise<void> {
		if (
			this.nameFormGroup.valid &&
			this.emailPasswordFormGroup.valid &&
			this.birthdayFormGroup.valid
		) {
			const nameFormGroupValue = this.nameFormGroup.value;
			const emailPasswordFormGroupValue =
				this.emailPasswordFormGroup.value;
			const birthdayFormGroupValue = this.birthdayFormGroup.value;

			try {
				this.openLoadingDialog();
				const response: ApiAuthResponse =
					await this._authService.signUp({
						email: emailPasswordFormGroupValue.email,
						first_name: nameFormGroupValue.firstName,
						last_name: nameFormGroupValue.lastName,
						date_of_birth: birthdayFormGroupValue.birthday,
						password: emailPasswordFormGroupValue.password,
						confirmPassword:
							emailPasswordFormGroupValue.confirmPassword,
					});
				this._snackBarService.showSnackBar(response.message);
			} catch (error: unknown) {
				let errorMessage = 'An error occurred.';
				const errorObj = error as ApiAuthErrorResponse;
				errorMessage = errorObj.error.message;
				this._snackBarService.showSnackBar(errorMessage);
			} finally {
				this.closeLoadingDialog();
			}
		} else {
			this._snackBarService.showSnackBar(
				'Please check the information you provided.'
			);
		}
	}
}
