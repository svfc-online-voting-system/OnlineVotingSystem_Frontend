import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'shared-component-card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './card.component.html',
})
export class Card {
	@Input() cardTitle?: string;
	@Input() cardDescription?: string;
	@Input() cardFooter?: string;
	@Input() className?: string;
}
