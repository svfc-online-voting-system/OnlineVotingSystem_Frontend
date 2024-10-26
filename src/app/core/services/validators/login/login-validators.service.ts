import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
	providedIn: 'any',
})
export class LoginValidatorsService {
	validatePassword(formGroup: FormGroup): string | null {
		const passwordErrors = formGroup.get('password')?.errors;
		if (passwordErrors) {
			let errorMessage = 'Please enter a valid password.';
			if (passwordErrors['required']) {
				errorMessage = 'Password is required.';
			} else if (passwordErrors['minlength']) {
				errorMessage = `Password must be at least ${passwordErrors['minlength'].requiredLength} characters long.`;
			}
			return errorMessage;
		}
		return null;
	}

	validateEmail(formGroup: FormGroup): string | null {
		if (formGroup.invalid) {
			return 'Please enter a valid email address.';
		}
		return null;
	}
}
