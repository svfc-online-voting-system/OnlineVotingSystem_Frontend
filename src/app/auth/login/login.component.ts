import { RouterLink, Router } from '@angular/router';
import { AuthService } from '@app/services/api/auth/auth.service';
import {
	Component,
	ViewChild,
	OnInit,
	inject,
	afterNextRender,
} from '@angular/core';
import {
	FormBuilder,
	Validators,
	FormsModule,
	FormGroup,
	ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import {
	MatCheckboxModule,
	type MatCheckbox,
} from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '@app/shared/ui/spinner/spinner.component';
import {
	ApiAuthResponse,
	type ApiAuthErrorResponse,
} from '@app/types/authResponseType';
import { LoginValidatorsService } from '@app/services/validators/login/login-validators.service';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
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
})
export class LoginComponent implements OnInit {
	@ViewChild('showPasswordToggler') showPasswordToggler!: MatCheckbox;
	@ViewChild('loginButton') loginButton!: HTMLButtonElement;
	readonly dialog = inject(MatDialog);

	emailFormGroup!: FormGroup;
	passwordFormGroup!: FormGroup;
	constructor(
		private _snackBarService: SnackbarService,
		private _formBuilder: FormBuilder,
		private _authService: AuthService,
		private _logInValidatorService: LoginValidatorsService,
		private _router: Router
	) {
		afterNextRender(() => {
			this.togglePasswordVisibility();
			this.disableLoginButtonOnSubmit();
			this.enableLoginButton();
		});
	}

	ngOnInit(): void {
		this.emailFormGroup = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
		});
		this.passwordFormGroup = this._formBuilder.group({
			password: ['', Validators.required],
		});
	}

	openLoadingDialog(): void {
		this.dialog.open(SpinnerComponent, {
			data: { message: 'Logging in...' },
		});
	}

	closeLoadingDialog(): void {
		this.dialog.closeAll();
	}

	togglePasswordVisibility(): void {
		const isChecked = this.showPasswordToggler.checked;
		const passwordInput = document.querySelector(
			'input[formControlName="password"]'
		) as HTMLInputElement;

		if (isChecked) {
			passwordInput.type = 'text';
		} else {
			passwordInput.type = 'password';
		}
	}

	disableLoginButtonOnSubmit(): void {
		this.loginButton.textContent = 'Logging in...';
		this.loginButton.disabled = true;
	}

	enableLoginButton(): void {
		this.loginButton.textContent = 'Log in';
		this.loginButton.disabled = false;
	}

	submitEmailForm(): void {
		const emailValidationResult = this._logInValidatorService.validateEmail(
			this.emailFormGroup
		);
		if (emailValidationResult) {
			this._snackBarService.showSnackBar(emailValidationResult);
		}
	}

	submitPasswordForm(): void {
		const passwordValidationResult =
			this._logInValidatorService.validatePassword(
				this.passwordFormGroup
			);
		if (passwordValidationResult) {
			this._snackBarService.showSnackBar(passwordValidationResult);
		}
	}

	async submitLogInForm(): Promise<void> {
		this.submitEmailForm();
		this.submitPasswordForm();

		if (this.emailFormGroup.valid && this.passwordFormGroup.valid) {
			const emailFormGroupValue = this.emailFormGroup.value;
			const passwordFormgroupValue = this.passwordFormGroup.value;
			const dialogTimer = setTimeout(() => {
				this.openLoadingDialog();
			}, 2000);
			this.disableLoginButtonOnSubmit();
			try {
				const response: ApiAuthResponse = await this._authService.login(
					{
						email: emailFormGroupValue.email,
						password: passwordFormgroupValue.password,
					}
				);
				if (response.code === 'success') {
					this._snackBarService.showSnackBar(response.message);
					this._router.navigate(['u/home']);
				} else {
					this._snackBarService.showSnackBar(response.message);
				}
			} catch (error: unknown) {
				let errorMessage = 'An error occurred.';
				const errorObj = error as ApiAuthErrorResponse;
				errorMessage = errorObj.error.message;
				this._snackBarService.showSnackBar(errorMessage);
			} finally {
				clearTimeout(dialogTimer);
				this.closeLoadingDialog();
				this.enableLoginButton();
			}
		} else {
			this._snackBarService.showSnackBar(
				'Please enter valid email and password.'
			);
		}
	}
}
