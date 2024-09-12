import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'root',
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
		if (formGroup.invalid) {
			return 'Please enter a valid email address.';
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

	validateAge(formGroup: FormGroup): string | null {
		const birthDateValue = formGroup.get('birthday')?.value;
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
			formGroup.setErrors({ underage: true });
			return 'You must be at least 18 years old.';
		}
		return null;
	}
}
