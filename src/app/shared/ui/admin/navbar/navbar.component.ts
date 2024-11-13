import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { AuthService, SnackbarService } from '@app/core/services';
import { DialogService } from '@app/core/services/dialog/dialog.service';

@Component({
	selector: 'app-admin-navbar',
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
