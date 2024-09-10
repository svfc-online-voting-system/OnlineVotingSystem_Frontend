import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterLink, RouterModule],
	template: ` <router-outlet></router-outlet> `,
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'online-voting-system';
}
