import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/admin/navbar/navbar.component';

@Component({
	selector: 'app-monitor-elections',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './monitor-elections.component.html',
	styleUrl: './monitor-elections.component.scss',
})
export class MonitorElectionsComponent {}
