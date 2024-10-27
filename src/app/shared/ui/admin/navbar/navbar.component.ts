import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { SnackbarService } from '@app/core/core.module';

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
	constructor(private snackBarService: SnackbarService) {}

	logoutCurrentSession() {
		this.snackBarService.showSnackBar('Logging out...');
	}
}
