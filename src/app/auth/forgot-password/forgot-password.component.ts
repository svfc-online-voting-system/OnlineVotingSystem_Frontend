import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { SnackbarService } from '@app/shared/snackbar.service';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // TODO: Deprecated, change it later
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-forgot-password',
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		MatDividerModule,
		MatInputModule,
		MatFormFieldModule,
		MatStepperModule,
		HttpClientModule,
	],
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
	forgotPasswordFormGroup!: FormGroup;

	constructor(
		private snackBar: SnackbarService,
		private _formBuilder: FormBuilder // private http: HttpClient
	) {}

	ngOnInit(): void {
		this.forgotPasswordFormGroup = this._formBuilder.group({
			email: [
				'',
				[
					Validators.required,
					Validators.email,
					Validators.pattern(
						/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
					),
				],
			],
		});
	}

	submitForgotPasswordForm(): void {
		if (this.forgotPasswordFormGroup.valid) {
			this.checkEmail().subscribe(
				(response) => {
					if (response.exists) {
						this.snackBar.showSnackBar(
							'Password reset link sent to your email'
						);
					} else {
						this.snackBar.showSnackBar('Email not found');
					}
				},
				(error) => {
					this.snackBar.showSnackBar(
						'An error occurred. Please try again later.'
					);
				}
			);
		}
	}

	checkEmail(): Observable<{ exists: boolean }> {
		// Mocked response for now
		// TODO: Implement this later
		const email = this.forgotPasswordFormGroup.get('email')?.value;
		const mockResponse =
			email === 'test@example.com' ? { exists: true } : { exists: false };
		return of(mockResponse);
	}
}
