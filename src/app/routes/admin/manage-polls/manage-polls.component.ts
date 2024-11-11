import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/admin/navbar/navbar.component';

@Component({
	selector: 'app-manage-polls',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './manage-polls.component.html',
	styleUrl: './manage-polls.component.scss',
})
export class ManagePollsComponent {}
