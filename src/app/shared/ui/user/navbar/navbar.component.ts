import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { AuthService, SnackbarService } from '@app/core/core.module';
import { DialogService } from '@app/core/services/dialog/dialog.service';

@Component({
	selector: 'app-user-navbar',
	standalone: true,
	imports: [
		MatButtonModule,
		MatMenuModule,
		MatTooltipModule,
		RouterLink,
		MatIcon,
	],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
	private readonly _snackBarService = inject(SnackbarService);
	private readonly _authService = inject(AuthService);
	private readonly _router = inject(Router);
	private readonly _dialogBox = inject(DialogService);

	openVotingInstructionsDialog() {
		this._dialogBox.openConfirmationDialog({
			title: 'Voting Instructions',
			message: `
						<p>1. Log in using your credentials.</p>
						<p>2. Review the candidates and their details.</p>
						<p>3. Select your preferred candidate(s) and confirm your vote.</p>
						<p>4. Submit your ballot securely and monitor your vote's status in real time.</p>
					`,
			confirmText: 'Got it!',
			showCancel: false,
			isHTML: true,
		});
	}

	async logoutCurrentSession() {
		this._dialogBox
			.openConfirmationDialog({
				title: 'Logout',
				message: 'Are you sure you want to log out?',
				confirmText: 'Yes',
				cancelText: 'No',
				showCancel: true,
				isHTML: false,
			})
			.subscribe({
				next: (confirmed) => {
					if (confirmed) {
						this._authService.logoutSession().subscribe({
							next: () => {
								this._snackBarService.showSnackBar(
									'Logged out successfully',
								);
								this._router.navigateByUrl('/');
							},
							error: (error) => {
								this._snackBarService.showSnackBar(
									'Failed to log out',
								);
								console.error('Error logging out:', error);
							},
						});
					}
				},
			});
	}
}
