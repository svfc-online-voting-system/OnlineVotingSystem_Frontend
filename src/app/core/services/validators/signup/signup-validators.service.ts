import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Injectable({
	providedIn: 'any',
})
export class SignupValidatorsService {
	validateName(formGroup: FormGroup): string | null {
		const firstNameErrors = formGroup.get('firstName')?.errors;
		const lastNameErrors = formGroup.get('lastName')?.errors;

		if (firstNameErrors) {
			if (firstNameErrors['required']) {
				return 'First Name is required.';
			} else if (firstNameErrors['minlength']) {
				return `First Name must be at least ${firstNameErrors['minlength'].requiredLength} characters long.`;
			}
		} else if (lastNameErrors) {
			if (lastNameErrors['required']) {
				return 'Last Name is required.';
			} else if (lastNameErrors['minlength']) {
				return `Last Name must be at least ${lastNameErrors['minlength'].requiredLength} characters long.`;
			}
		}
		return null;
	}

	validateEmail(formGroup: FormGroup): string | null {
		const emailErrors = formGroup.get('email')?.errors;

		if (emailErrors) {
			if (emailErrors['required']) {
				return 'Email is required.';
			} else if (emailErrors['email']) {
				return 'Please enter a valid email address.';
			}
		}
		return null;
	}

	validatePassword(formGroup: FormGroup): string | null {
		const passwordValue = formGroup.get('password')?.value;
		const confirmPasswordValue = formGroup.get('confirmPassword')?.value;
		const passwordErrors = formGroup.get('password')?.errors;

		if (passwordErrors) {
			if (passwordErrors['required']) {
				return 'Password is required.';
			} else if (passwordErrors['minlength']) {
				return `Password must be at least ${passwordErrors['minlength'].requiredLength} characters long.`;
			}
		} else if (passwordValue !== confirmPasswordValue) {
			return 'Passwords do not match.';
		}
		return null;
	}

	validatePasswordMatch(password: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const confirmPassword = control.get('confirmPassword');
			if (confirmPassword?.value !== password) {
				return { passwordMatch: true };
			}
			return null;
		};
	}
}
