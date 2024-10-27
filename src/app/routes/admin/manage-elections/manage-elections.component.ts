import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/admin/navbar/navbar.component';

@Component({
	selector: 'app-manage-elections',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './manage-elections.component.html',
	styleUrl: './manage-elections.component.scss',
})
export class ManageElectionsComponent {}
