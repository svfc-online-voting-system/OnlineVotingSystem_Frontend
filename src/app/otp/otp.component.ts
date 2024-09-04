import { Component } from '@angular/core';
import { ReusableCardComponent } from '../reusable-card/reusable-card.component';

@Component({
	selector: 'app-otp',
	standalone: true,
	imports: [ReusableCardComponent],
	templateUrl: './otp.component.html',
	styleUrl: './otp.component.css',
})
export class OtpComponent {}
