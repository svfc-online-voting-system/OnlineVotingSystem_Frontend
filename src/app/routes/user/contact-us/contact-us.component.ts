import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';

@Component({
	selector: 'app-contact-us',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './contact-us.component.html',
	styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {}
