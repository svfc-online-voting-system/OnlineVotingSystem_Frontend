import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-user-navbar',
	standalone: true,
	imports: [MatButtonModule, MatMenuModule, MatTooltipModule, RouterLink],

	templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
