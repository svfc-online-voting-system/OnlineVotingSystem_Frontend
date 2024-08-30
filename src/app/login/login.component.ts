import { Component } from '@angular/core';
import { ReusableCardComponent } from '../reusable-card/reusable-card.component';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReusableCardComponent, RouterLink],
	templateUrl: './login.component.html',
})
export class LoginComponent {}
