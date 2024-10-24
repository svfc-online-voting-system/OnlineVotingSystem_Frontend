import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/admin/navbar/navbar.component';

@Component({
	selector: 'app-generate-reports',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './generate-reports.component.html',
})
export class GenerateReportsComponent {}
