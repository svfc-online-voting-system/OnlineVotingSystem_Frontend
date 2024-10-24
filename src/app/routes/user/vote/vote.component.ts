import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';

@Component({
	selector: 'app-vote',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './vote.component.html',
})
export class VoteComponent {}
