import { Component } from '@angular/core';
import { NavbarComponent } from '@app/shared/ui/user/navbar/navbar.component';

@Component({
	selector: 'app-voting-instructions',
	standalone: true,
	imports: [NavbarComponent],
	templateUrl: './voting-instructions.component.html',
	styleUrl: './voting-instructions.component.scss',
})
export class VotingInstructionsComponent {}
