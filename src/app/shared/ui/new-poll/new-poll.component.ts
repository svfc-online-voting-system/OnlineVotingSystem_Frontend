import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';
@Component({
	selector: 'app-new-poll',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './new-poll.component.html',
})
export class NewPollComponent {}
