import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';

@Component({
	selector: 'app-otp',
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
	],
	templateUrl: './otp.component.html',
})
export class OtpComponent implements OnInit {
	otpFormGroup!: FormGroup;

	constructor(
		private _formBuilder: FormBuilder,
		private snackBar: SnackbarService
	) {}

	ngOnInit(): void {
		this.otpFormGroup = this._formBuilder.group({
			otp: [
				'',
				[
					Validators.required,
					Validators.pattern('^[0-9]{6}$'),
					Validators.minLength(6),
					Validators.maxLength(6),
				],
			],
		});
	}

	submitOtpForm(): void {
		if (this.otpFormGroup.valid) {
			this.snackBar.showSnackBar('OTP verified');
		} else {
			this.snackBar.showSnackBar('Invalid OTP');
		}
	}
}
