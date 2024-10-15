import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AuthService } from '@app/services/api/auth/auth.service';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';

@Component({
	selector: 'app-user-navbar',
	standalone: true,
	imports: [MatButtonModule, MatMenuModule, MatTooltipModule, RouterLink],
	templateUrl: './navbar.component.html',
})
export class NavbarComponent {
	constructor(
		private snackBarService: SnackbarService,
		private _authService: AuthService,
	) {}
	async logoutCurrentSession(): Promise<void> {
		this._authService.logoutSession().subscribe({
			next: (response) => {
				this.snackBarService.showSnackBar(response.message);
			},
			error: (error) => {
				this.snackBarService.showSnackBar(error.message);
			},
		});
		this.snackBarService.showSnackBar('Logging out...');
	}
}
