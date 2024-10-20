import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { SnackbarService } from '@app/core/core.module';

@Component({
	selector: 'app-forgot-password',
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatStepperModule,
	],
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
	forgotPasswordFormGroup!: FormGroup;

	constructor(
		private snackBar: SnackbarService,
		private _formBuilder: FormBuilder,
	) {}

	ngOnInit(): void {
		this.forgotPasswordFormGroup = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

	submitForgotPasswordForm(): void {
		if (this.forgotPasswordFormGroup.valid) {
			return;
		}
	}
}
