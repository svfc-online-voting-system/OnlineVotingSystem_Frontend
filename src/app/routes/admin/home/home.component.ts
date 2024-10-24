import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/admin/navbar/navbar.component';

@Component({
	selector: 'app-admin-home',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './home.component.html',
})
export class AdminHomeComponent {}
