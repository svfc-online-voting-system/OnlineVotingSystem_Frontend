import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndefiniteLoaderComponent } from '@app/shared/ui/loader/indefinite-loader/indefinite-loader.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterModule, IndefiniteLoaderComponent],
	template: `<main class="w-full">
		<app-indefinite-loader></app-indefinite-loader>
		<router-outlet></router-outlet>
	</main>`,
})
export class AppComponent {
	title = 'online-voting-system';
}
