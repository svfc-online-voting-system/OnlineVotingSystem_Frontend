import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { SnackbarService } from '@app/core/services';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
	selector: 'app-forgot-password',
	standalone: true,
	imports: [
		NgIf,
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatStepperModule,
		ReactiveFormsModule,
	],
	templateUrl: './forgot-password.component.html',
	styleUrl: '../../../../styles/auth_forms_styles/auth_forms.scss',
})
export class ForgotPasswordComponent implements OnInit {
	private readonly _snackBarService = inject(SnackbarService);
	private readonly _formBuilder = inject(FormBuilder);
	forgotPasswordFormGroup!: FormGroup;

	ngOnInit(): void {
		this.forgotPasswordFormGroup = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
		});
	}

	submitForgotPasswordForm(): void {
		if (this.forgotPasswordFormGroup.valid) {
			this._snackBarService.showSnackBar(
				'Password reset link sent to your email',
			);
		}
	}
}
