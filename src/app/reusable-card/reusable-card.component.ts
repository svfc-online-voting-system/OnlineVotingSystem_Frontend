import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-reusable-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './reusable-card.component.html',
})
export class ReusableCardComponent {
	@Input() cardTitle?: string;
	@Input() cardDescription?: string;
	@Input() cardFooter?: string;
	@Input() className?: string;
}
