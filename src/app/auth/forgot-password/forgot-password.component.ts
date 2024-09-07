import { Component } from '@angular/core';
import { Card } from '@app/shared-component/card/card.component';

@Component({
	selector: 'app-forgot-password',
	standalone: true,
	imports: [Card],
	templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {}
