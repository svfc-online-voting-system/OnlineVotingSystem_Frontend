import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterLink, RouterModule],
	template: `<main class="w-full"><router-outlet></router-outlet></main>`,
})
export class AppComponent {
	title = 'online-voting-system';
}
