import {
	Component,
	OnInit,
	Inject,
	inject,
	PLATFORM_ID,
	ViewChild,
	AfterViewInit,
	ChangeDetectorRef,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
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
	],
	imports: [
		CommonModule,
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
export class SignupComponent implements OnInit, AfterViewInit {
	showPassword = false;
	submitting = false;
	@ViewChild('stepper') stepper!: MatStepper;
	@ViewChild('showPasswordToggler') showPasswordToggler!: HTMLInputElement;
	@ViewChild('passwordField') passwordField!: HTMLInputElement;
	nameFormGroup!: FormGroup;
	birthdayFormGroup!: FormGroup;
	emailPasswordFormGroup!: FormGroup;
	passwordFormGroup!: FormGroup;
	passwordValue = '';
	readonly dialog = inject(MatDialog);
	isBrowser: boolean;
	readonly minInimumDate = new Date(1900, 0, 1);
	readonly maximumDate = new Date(
		new Date().setFullYear(new Date().getFullYear() - 18),
	);

	constructor(
		private _formBuilder: FormBuilder,
		private _snackBarService: SnackbarService,
		private _authService: AuthService,
		private _signUpValidatorService: SignupValidatorsService,
		@Inject(PLATFORM_ID) private platformId: object,
		private cdr: ChangeDetectorRef,
	) {
		this.isBrowser = isPlatformBrowser(this.platformId);
	}

	ngOnInit(): void {
		this._initSignUpFormGroups();
		if (this.isBrowser) {
			this._initializeBrowserSpecificModules();
		}
	}

	ngAfterViewInit(): void {
		this.emailPasswordFormGroup
			.get('showPassword')
			?.valueChanges.subscribe((value) => {
				this.showPassword = value;
				this.cdr.detectChanges();
			});
	}

	private _initializeBrowserSpecificModules(): void {
		import('@angular/material/datepicker').then(() => {
			this._formBuilder.group({
				birthday: [Date.now(), [Validators.required]],
			});
		});
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

		this.emailPasswordFormGroup = this._formBuilder.group(
			{
				email: ['', [Validators.required, Validators.email]],
				password: ['', [Validators.required, Validators.minLength(8)]],
				confirmPassword: ['', [Validators.required]],
				showPassword: [false],
			},
			{ validator: this.passwordMatchValidator },
		);
	}

	togglePasswordVisibility(): void {
		this.showPassword = !this.showPassword;
		this.cdr.detectChanges();
	}

	passwordMatchValidator(formGroup: FormGroup) {
		const password = formGroup.get('password')?.value;
		const confirmPassword = formGroup.get('confirmPassword')?.value;
		return password === confirmPassword ? null : { mismatch: true };
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

	openLoadingDialog(): void {
		if (this.isBrowser) {
			this.dialog.open(SpinnerComponent, {
				data: { message: 'Logging in...' },
			});
		}
	}

	closeLoadingDialog(): void {
		if (this.isBrowser) {
			this.dialog.closeAll();
		}
	}

	submitNameForm(): void {
		if (this.isBrowser) {
			const errorMessage = this._signUpValidatorService.validateName(
				this.nameFormGroup,
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
					'Please enter your birthday.',
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
				this.emailPasswordFormGroup,
			);
			const passWordErrorMessage =
				this._signUpValidatorService.validatePassword(
					this.emailPasswordFormGroup,
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
			const dialogTimer = setTimeout(() => {
				this.openLoadingDialog();
			}, 2000);
			this.submitting = true;
			try {
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
