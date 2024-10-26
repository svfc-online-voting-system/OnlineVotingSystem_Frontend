import { RouterLink, Router } from '@angular/router';
import { AuthService } from '@app/core/core.module';
import {
	Component,
	ViewChild,
	OnInit,
	inject,
	afterNextRender,
	PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import {
	FormBuilder,
	Validators,
	FormsModule,
	FormGroup,
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
import { LoginValidatorsService, SnackbarService } from '@app/core/core.module';
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
export class LoginComponent implements OnInit {
	private readonly _snackBarService = inject(SnackbarService);
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _authService = inject(AuthService);
	private readonly _logInValidatorService = inject(LoginValidatorsService);
	private readonly _router = inject(Router);
	private readonly _platformId = inject(PLATFORM_ID);
	@ViewChild('showPasswordToggler') showPasswordToggler!: MatCheckbox;
	@ViewChild('loginButton') loginButton!: HTMLButtonElement;
	isBrowser: boolean;
	emailFormGroup!: FormGroup;
	passwordFormGroup!: FormGroup;
	constructor() {
		this.isBrowser = isPlatformBrowser(this._platformId);
		afterNextRender(() => {
			this.disableLoginButtonOnSubmit();
			this.enableLoginButton();
		});
	}

	loginFormGroup = this._formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', Validators.required],
	});

	ngOnInit(): void {
		this.emailFormGroup = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
		});
		this.passwordFormGroup = this._formBuilder.group({
			password: ['', Validators.required],
		});
	}

	disableLoginButtonOnSubmit(): void {
		if (this.isBrowser) {
			this.loginButton.textContent = 'Logging in...';
			this.loginButton.disabled = true;
		}
	}

	enableLoginButton(): void {
		if (this.isBrowser) {
			this.loginButton.textContent = 'Log in';
			this.loginButton.disabled = false;
		}
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
				this.disableLoginButtonOnSubmit();

				this._authService.login(loginInformation).subscribe({
					next: (response: ApiAuthResponse) => {
						if (response.code === 'otp_sent') {
							this._snackBarService.showSnackBar(response.message);
							this._router.navigate(['/auth/otp-verification']);
						} else {
							this._snackBarService.showSnackBar(response.message);
						}
					},
					error: (error: ApiAuthErrorResponse) => {
						// TODO: Remove the console.error() statement
						console.error('An error occurred:', error);
						this._snackBarService.showSnackBar(
							`${error.error.message}`,
						);
						this.loginButton.disabled = false;
					},
					complete: () => {
						this.enableLoginButton();
					},
				});
			} else {
				this._snackBarService.showSnackBar(
					'Please enter valid email and password.',
				);
			}
		}
	}
}
