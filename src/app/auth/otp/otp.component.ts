import { Component } from '@angular/core';
import { Card } from '@app/shared-component/card/card.component';

@Component({
	selector: 'app-otp',
	standalone: true,
	imports: [Card],
	templateUrl: './otp.component.html',
})
export class OtpComponent {}
