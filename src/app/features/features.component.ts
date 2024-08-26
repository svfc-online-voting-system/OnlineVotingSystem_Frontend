import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-features',
	standalone: true,
	imports: [RouterModule],
	template: ` <h1>Features Page</h1> `,
	styleUrl: './features.component.css',
})
export class FeaturesComponent {
	title = 'Features';
}
