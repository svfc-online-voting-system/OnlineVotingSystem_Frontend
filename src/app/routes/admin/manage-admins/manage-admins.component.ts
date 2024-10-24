import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/admin/navbar/navbar.component';

@Component({
	selector: 'app-manage-admins',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './manage-admins.component.html',
})
export class ManageAdminsComponent {}
