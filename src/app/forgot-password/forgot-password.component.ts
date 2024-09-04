import { Component } from '@angular/core';
import { ReusableCardComponent } from '../reusable-card/reusable-card.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReusableCardComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

}
