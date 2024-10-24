import {
	Component,
	OnInit,
	Inject,
	inject,
	PLATFORM_ID,
	ViewChild,
	ChangeDetectorRef,
	type InjectionToken,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
		MatCheckboxModule,
	],
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
	isBrowser: boolean;
	readonly maximumDate: Date | null;

	showPassword = false;
	submitting = false;
	@ViewChild('showPasswordToggler') showPasswordToggler!: HTMLInputElement;
	@ViewChild('passwordField') passwordField!: HTMLInputElement;
	signUpFormGroup!: FormGroup;
	passwordValue = '';
	readonly dialog = inject(MatDialog);

	constructor(
		private _formBuilder: FormBuilder,
		private _snackBarService: SnackbarService,
		private _authService: AuthService,
		private _signUpValidatorService: SignupValidatorsService,
		@Inject(PLATFORM_ID) private _platformId: InjectionToken<object>,
		private _cdr: ChangeDetectorRef,
	) {
		this.isBrowser = isPlatformBrowser(this._platformId);
		this.maximumDate = this.isBrowser
			? new Date(new Date().setFullYear(new Date().getFullYear() - 18))
			: null;
	}

	ngOnInit(): void {
		if (this.isBrowser) {
			this.signUpFormGroup = this._formBuilder.group(
				{
					firstName: [
						'',
						[Validators.required, Validators.minLength(2)],
					],
					lastName: [
						'',
						[Validators.required, Validators.minLength(2)],
					],
					email: ['', [Validators.required, Validators.email]],
					password: [
						'',
						[Validators.required, Validators.minLength(8)],
					],
					confirmPassword: [
						'',
						[Validators.required, Validators.minLength(8)],
					],
					birthday: [null, Validators.required],
				},
				{ validators: this.passwordMatchValidator },
			);
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

	changePasswordVisibility(): void {
		if (this.isBrowser) {
			this.showPassword = !this.showPassword;
			this._cdr.detectChanges();
		}
	}

	togglePasswordVisibility(): void {
		if (this.isBrowser) {
			this.showPasswordToggler.checked =
				!this.showPasswordToggler.checked;
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
