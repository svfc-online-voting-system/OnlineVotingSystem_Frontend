import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { AuthService, SnackbarService } from '@app/core/core.module';

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
	private _snackBarService = inject(SnackbarService);
	private _authService = inject(AuthService);
	async logoutCurrentSession(): Promise<void> {
		this._authService.logoutSession().subscribe({
			next: (response) => {
				this._snackBarService.showSnackBar(response.message);
			},
			error: (error) => {
				this._snackBarService.showSnackBar(error.message);
			},
		});
		this._snackBarService.showSnackBar('Logging out...');
	}
}
