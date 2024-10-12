import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';

@Component({
	selector: 'app-view-ballot',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './view-ballot.component.html',
	styleUrl: './view-ballot.component.css',
})
export class ViewBallotComponent {}
