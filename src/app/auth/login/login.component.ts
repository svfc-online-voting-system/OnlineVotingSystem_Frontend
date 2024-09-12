import { RouterLink } from '@angular/router';
import { Component, ViewChild, OnInit } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';

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

	emailFormGroup!: FormGroup;
	passwordFormGroup!: FormGroup;
	constructor(
		private _snackBar: MatSnackBar,
		private _formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this.emailFormGroup = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
		});
		this.passwordFormGroup = this._formBuilder.group({
			password: ['', Validators.required],
		});
	}

	showSnackbarMessage(message: string): void {
		this._snackBar.open(message, 'Close', {
			duration: 3000,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		});
	}

	togglePasswordVisibility(): void {
		const isChecked = this.showPasswordToggler.checked;
		const passwordInput = document.querySelector(
			'input[formControlName="password"]'
		) as HTMLInputElement;
		const confirmPasswordInput = document.querySelector(
			'input[formControlName="confirmPassword"]'
		) as HTMLInputElement;

		if (isChecked) {
			passwordInput.type = 'text';
			confirmPasswordInput.type = 'text';
		} else {
			passwordInput.type = 'password';
			confirmPasswordInput.type = 'password';
		}
	}

	submitEmailForm(): void {
		if (this.emailFormGroup.invalid)
			this.showSnackbarMessage('Please enter a valid email address.');
	}

	submitPasswordForm(): void {
		const passwordErrors = this.passwordFormGroup.get('password')?.errors;
		if (passwordErrors) {
			let errorMessage = 'Please enter a valid password.';
			if (passwordErrors['required']) {
				errorMessage = 'Password is required.';
			} else if (passwordErrors['minlength']) {
				errorMessage = `Password must be at least ${passwordErrors['minlength'].requiredLength} characters long.`;
			}
			this.showSnackbarMessage(errorMessage);
		}
	}

	submitLogInForm(): void {
		this.submitEmailForm();
		this.submitPasswordForm();

		if (this.emailFormGroup.valid && this.passwordFormGroup.valid) {
			this.showSnackbarMessage('Logging in...');
		}
	}
}
