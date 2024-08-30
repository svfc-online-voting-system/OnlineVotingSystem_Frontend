import { Component } from '@angular/core';
import { ReusableCardComponent } from '../reusable-card/reusable-card.component';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-signup',
	standalone: true,
	imports: [ReusableCardComponent, RouterLink],
	templateUrl: './signup.component.html',
	styleUrl: './signup.component.css',
})
export class SignupComponent {}
