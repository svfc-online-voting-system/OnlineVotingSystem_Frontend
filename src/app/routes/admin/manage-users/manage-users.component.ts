import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/admin/navbar/navbar.component';

@Component({
	selector: 'app-manage-users',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './manage-users.component.html',
	styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent {}
