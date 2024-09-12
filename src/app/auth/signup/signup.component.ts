import { Component, OnInit } from '@angular/core';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';
import { SignupValidatorsService } from '@app/services/validators/signup/signup-validators.service';

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

	nameFormGroup!: FormGroup;
	birthdayFormGroup!: FormGroup;
	emailFormGroup!: FormGroup;
	passwordFormGroup!: FormGroup;

	constructor(
		private _formBuilder: FormBuilder,
		private _snackBarService: SnackbarService,
		private _signUpValidatorService: SignupValidatorsService,
	) {}

	ngOnInit(): void {
		this.nameFormGroup = this._formBuilder.group({
			firstName: ['', [Validators.required, Validators.minLength(2)]],
			lastName: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.email]],
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
		const nameValidationResult = this._signUpValidatorService.validateName(
			this.nameFormGroup
		);
		if (nameValidationResult) {
			console.log('Pass');
			this._snackBarService.showSnackBar(nameValidationResult);
		}
	}

	submitBirthdayForm(): void {
		const birthDateValidationResult =
			this._signUpValidatorService.validateAge(this.birthdayFormGroup);
		if (birthDateValidationResult) {
			console.log('Pass');
			this._snackBarService.showSnackBar('Invalid birthday.');
		}
	}
	submitEmailForm(): void {
		const emailValidationResult =
			this._signUpValidatorService.validateEmail(this.emailFormGroup);
		if (emailValidationResult) {
			console.log('Pass');
			this._snackBarService.showSnackBar(emailValidationResult);
		}
	}

	submitPasswordForm(): void {
		const passwordValidationResult =
			this._signUpValidatorService.validatePassword(
				this.passwordFormGroup
			);
		if (passwordValidationResult) {
			console.log('Pass');
			this._snackBarService.showSnackBar(passwordValidationResult);
		}
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
			this._snackBarService.showSnackBar('Account created successfully!');
		}
	}
}
