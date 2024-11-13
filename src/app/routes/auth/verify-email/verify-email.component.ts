import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, SnackbarService } from '@app/core/services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-verify-email',
	standalone: true,
	imports: [MatProgressSpinnerModule],
	templateUrl: './verify-email.component.html',
	styleUrl: './verify-email.component.scss',
})
export class VerifyEmailComponent implements OnInit {
	private readonly _route = inject(ActivatedRoute);
	private readonly _router = inject(Router);
	private readonly _authService = inject(AuthService);
	private readonly _snackBarService = inject(SnackbarService);
	token: string | null = null;

	async ngOnInit(): Promise<void> {
		this._route.paramMap.subscribe(async (params) => {
			this.token = params.get('token') as string;
			try {
				const result = await this._authService.verifyEmail(this.token);
				if (result) {
					this._snackBarService.showSnackBar(
						'Email verified successfully, please login.',
					);
					this._router.navigate(['/auth/login']);
				}
			} catch {
				this._snackBarService.showSnackBar(
					'Error verifying email. Please try again.',
				);
				this._router.navigate(['/auth/login']);
			}
		});
	}
}
