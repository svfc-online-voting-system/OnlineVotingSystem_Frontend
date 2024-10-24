import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';

@Component({
	selector: 'app-settings',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './settings.component.html',
})
export class SettingsComponent {}
