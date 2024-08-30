import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-reusable-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './reusable-card.component.html',
})
export class ReusableCardComponent {
	@Input() title?: string;
	@Input() description?: string;
	@Input() footer?: string;
	@Input() className?: string;
}
