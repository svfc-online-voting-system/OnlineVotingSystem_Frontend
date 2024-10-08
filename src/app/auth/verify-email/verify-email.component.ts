import { Component, type OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/services/api/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';

@Component({
	selector: 'app-verify-email',
	standalone: true,
	imports: [MatProgressSpinnerModule],
	templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent implements OnInit {
	token: string | null = null;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		private snackBarService: SnackbarService,
	) {}

	async ngOnInit(): Promise<void> {
		this.route.paramMap.subscribe(async (params) => {
			this.token = params.get('token') as string;
			try {
				const result = await this.authService.verifyEmail(this.token);
				if (result) {
					this.snackBarService.showSnackBar(
						'Email verified successfully, please login.',
					);
					this.router.navigate(['/auth/login']);
				}
			} catch {
				this.snackBarService.showSnackBar(
					'Error verifying email. Please try again.',
				);
				this.router.navigate(['/auth/login']);
			}
		});
	}
}
