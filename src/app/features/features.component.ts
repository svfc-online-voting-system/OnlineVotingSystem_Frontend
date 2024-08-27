import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-features',
	standalone: true,
	imports: [RouterModule],
	template: `
		<main>
			<h1>Features Page</h1>
		</main>
	`,
	styleUrl: './features.component.css',
})
export class FeaturesComponent {
	title = 'Features';
}
