import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import {
	FormBuilder,
	Validators,
	FormsModule,
	FormGroup,
	ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import {
	MatCheckboxModule,
	type MatCheckbox,
} from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-signup',
	standalone: true,
	providers: [provideNativeDateAdapter()],
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
	@ViewChild('showPasswordToggler') showPasswordToggler!: MatCheckbox;
	nameFormGroup!: FormGroup;
	birthdayFormGroup!: FormGroup;
	emailFormGroup!: FormGroup;
	passwordFormGroup!: FormGroup;

	constructor(
		private _snackBar: MatSnackBar,
		private _formBuilder: FormBuilder
	) {}

	showSnackbarMessage(message: string): void {
		this._snackBar.open(message, 'Close', {
			duration: 3000,
			horizontalPosition: 'center',
			verticalPosition: 'top',
		});
	}

	// Helper function to close the snackbar if deemed necessary to do so
	closeSnackbar(): void {
		this._snackBar.dismiss();
	}

	ngOnInit(): void {
		this.nameFormGroup = this._formBuilder.group({
			firstName: ['', [Validators.required, Validators.minLength(2)]],
			lastName: ['', [Validators.required, Validators.minLength(2)]],
		});

		this.birthdayFormGroup = this._formBuilder.group({
			birthday: [Date.now(), [Validators.required]],
		});

		this.emailFormGroup = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
		});

		this.passwordFormGroup = this._formBuilder.group({
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', [Validators.required]],
		});
	}

	submitNameForm(): void {
		if (this.nameFormGroup.invalid) {
			const firstNameErrors = this.nameFormGroup.get('firstName')?.errors;
			const lastNameErrors = this.nameFormGroup.get('lastName')?.errors;

			let errorMessage = 'Please fill out your name correctly.';

			if (firstNameErrors) {
				if (firstNameErrors['required']) {
					errorMessage = 'First Name is required.';
				} else if (firstNameErrors['minlength']) {
					errorMessage = `First Name must be at least ${firstNameErrors['minlength'].requiredLength} characters long.`;
				}
			} else if (lastNameErrors) {
				if (lastNameErrors['required']) {
					errorMessage = 'Last Name is required.';
				} else if (lastNameErrors['minlength']) {
					errorMessage = `Last Name must be at least ${lastNameErrors['minlength'].requiredLength} characters long.`;
				}
			}

			this.showSnackbarMessage(errorMessage);
		}
	}

	submitBirthdayForm(): void {
		if (this.birthdayFormGroup.invalid) {
			this.showSnackbarMessage('Please enter a valid birthdate.');
			return;
		}

		const birthDateValue = this.birthdayFormGroup.get('birthday')?.value;
		const birthDate = new Date(birthDateValue);
		const currentDate = new Date();
		let age = currentDate.getFullYear() - birthDate.getFullYear();
		const monthDifference = currentDate.getMonth() - birthDate.getMonth();
		const dayDifference = currentDate.getDate() - birthDate.getDate();

		if (
			monthDifference < 0 ||
			(monthDifference === 0 && dayDifference < 0)
		) {
			age--;
		}

		if (age < 18) {
			this.showSnackbarMessage('You must be at least 18 years old.');
			this.birthdayFormGroup.setErrors({ underage: true });
		} else {
			this.showSnackbarMessage('Valid birthdate!');
		}
	}
	submitEmailForm(): void {
		if (this.emailFormGroup.invalid)
			this.showSnackbarMessage('Please enter a valid email address.');
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

	submitPasswordForm(): void {
		const passwordValue = this.passwordFormGroup.get('password')?.value;
		const confirmPasswordValue =
			this.passwordFormGroup.get('confirmPassword')?.value;
		const passwordErrors = this.passwordFormGroup.get('password')?.errors;

		if (passwordErrors) {
			let errorMessage = 'Please enter a valid password.';

			if (passwordErrors['required']) {
				errorMessage = 'Password is required.';
			} else if (passwordErrors['minlength']) {
				errorMessage = `Password must be at least ${passwordErrors['minlength'].requiredLength} characters long.`;
			}

			this.showSnackbarMessage(errorMessage);
		} else if (passwordValue !== confirmPasswordValue)
			this.showSnackbarMessage('Passwords do not match.');
	}

	isInvalidAndTouched(formGroup: FormGroup, controlName: string): boolean {
		const control = formGroup.get(controlName);
		return (
			!!control && control.invalid && (control.dirty || control.touched)
		);
	}

	onSignUpFormSubmit(): void {
		if (
			this.nameFormGroup.valid &&
			this.emailFormGroup.valid &&
			this.passwordFormGroup.valid
		) {
			// TODO: Implement form submission with server side validation
			this.showSnackbarMessage('Account created successfully!');
		}
	}
}
