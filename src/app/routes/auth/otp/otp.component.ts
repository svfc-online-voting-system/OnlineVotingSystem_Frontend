import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
import { SnackbarService, AuthService } from '@app/core/core.module';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil, timeout } from 'rxjs/operators';
import {
	ApiAuthErrorResponse,
	ApiAuthResponse,
} from '@app/core/models/authResponseType';

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
	styleUrl: '../../../../styles/auth_forms.scss',
})
export class OtpComponent implements OnInit, OnDestroy {
	private readonly _formBuilder = inject(FormBuilder);
	private readonly _authService = inject(AuthService);
	private readonly _router = inject(Router);
	private readonly _snackBarService = inject(SnackbarService);
	private unsubscribe$ = new Subject<void>();
	otpFormGroup!: FormGroup;

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
						this._snackBarService.showSnackBar(
							'OTP sent to your email',
						);
					} else {
						this._router.navigate(['/auth/login']);
						this._snackBarService.showSnackBar(
							'Please login first',
						);
					}
				},
				error: () => {
					this._router.navigate(['/auth/login']);
					this._snackBarService.showSnackBar('Please login first');
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
				this._snackBarService.showSnackBar('OTP must be 7 digits');
			} else {
				this._authService
					.verifyOTP(otp)
					.pipe(timeout(15000))
					.subscribe({
						next: (response: ApiAuthResponse) => {
							if (response.code === 'success') {
								this._snackBarService.showSnackBar(
									'OTP verified',
								);
								this._router.navigate(['/u/home']);
							} else {
								this._snackBarService.showSnackBar(
									'Invalid OTP',
								);
							}
						},
						error: (error: ApiAuthErrorResponse) => {
							this._snackBarService.showSnackBar(
								`${error.error.message}`,
							);
						},
					});
			}
		} else if (this.otpFormGroup.invalid) {
			this._snackBarService.showSnackBar('Invalid OTP');
		}
	}
}
