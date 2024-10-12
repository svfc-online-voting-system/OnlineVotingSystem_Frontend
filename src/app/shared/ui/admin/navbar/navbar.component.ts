import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { SnackbarService } from '@app/services/snackbar/snackbar.service';

@Component({
	selector: 'app-admin-navbar',
	standalone: true,
	imports: [MatButtonModule, MatMenuModule, MatTooltipModule, RouterLink],
	templateUrl: './navbar.component.html',
})
export class NavbarComponent {
	constructor(private snackBarService: SnackbarService) {}

	logoutCurrentSession() {
		this.snackBarService.showSnackBar('Logging out...');
	}
}
