import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';

@Component({
	selector: 'app-user-home',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
})
export class UserHomeComponent {}
