import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import {
	FormGroup,
	Validators,
	FormBuilder,
	ReactiveFormsModule,
} from '@angular/forms';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';
import { Subject } from 'rxjs';
import { AuthService } from '@app/services/api/auth/auth.service';
import { Router } from '@angular/router';
import { takeUntil, timeout } from 'rxjs/operators';
import {
	ApiAuthErrorResponse,
	ApiAuthResponse,
} from '@app/types/authResponseType';

@Component({
	selector: 'app-otp',
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
	],
	templateUrl: './otp.component.html',
})
export class OtpComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject<void>();
	otpFormGroup!: FormGroup;

	constructor(
		private _formBuilder: FormBuilder,
		private snackBar: SnackbarService,
		private _authService: AuthService,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.otpFormGroup = this._formBuilder.group({
			otp: [
				'',
				[
					Validators.required,
					Validators.pattern('^[0-9]{7}$'),
					Validators.minLength(7),
					Validators.maxLength(7),
				],
			],
		});

		this._authService
			.getCurrentUser()
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe({
				next: (user) => {
					if (user) {
						this.snackBar.showSnackBar('OTP sent to your email');
					} else {
						this.router.navigate(['/auth/login']);
						this.snackBar.showSnackBar('Please login first');
					}
				},
				error: () => {
					this.router.navigate(['/auth/login']);
					this.snackBar.showSnackBar('Please login first');
				},
			});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		this._authService.clearCurrentUser();
	}

	async submitOtpForm(): Promise<void> {
		if (this.otpFormGroup.valid) {
			const otp = String(this.otpFormGroup.value.otp);
			console.log('otp:', otp);
			if (otp.length != 7) {
				console.log('first clause');
				this.snackBar.showSnackBar('OTP must be 7 digits');
			} else {
				this._authService
					.verifyOTP(otp)
					.pipe(timeout(15000))
					.subscribe({
						next: (response: ApiAuthResponse) => {
							if (response.code === 'success') {
								this.snackBar.showSnackBar('OTP verified');
								this.router.navigate(['/u/home']);
							} else {
								this.snackBar.showSnackBar('Invalid OTP');
							}
						},
						error: (error: ApiAuthErrorResponse) => {
							// TODO: remove console.error after testing
							console.error('Error verifying OTP:', error);
							this.snackBar.showSnackBar(
								`${error.error.message}`,
							);
						},
					});
			}
		} else if (this.otpFormGroup.invalid) {
			this.snackBar.showSnackBar('Invalid OTP');
		}
	}
}
