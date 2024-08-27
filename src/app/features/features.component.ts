import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-features',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './features.component.html',
	styleUrl: './features.component.css',
})
export class FeaturesComponent {
	title = 'Features';
}
