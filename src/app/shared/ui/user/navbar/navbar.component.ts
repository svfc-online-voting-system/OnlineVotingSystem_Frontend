import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
	selector: 'app-user-navbar',
	standalone: true,
	imports: [MatButtonModule, MatMenuModule],

	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
