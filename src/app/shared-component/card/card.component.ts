import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'Card',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './card.component.html',
})
export class Card {
	@Input() cardTitle?: string;
	@Input() cardDescription?: string;
	@Input() className?: string;
}
