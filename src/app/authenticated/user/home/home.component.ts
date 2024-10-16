import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';
import { FilterNavComponent } from '@app/shared/ui/user/filter-nav/filter-nav.component';

@Component({
	selector: 'app-user-home',
	standalone: true,
	imports: [NavbarComponent, FilterNavComponent],
	templateUrl: './home.component.html',
})
export class UserHomeComponent {}
