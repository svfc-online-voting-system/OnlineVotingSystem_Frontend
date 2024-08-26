import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterLink],
	template: `
		<main
			class="main w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 gap-20"
		>
			<div>
				<h1
					class="font-bold text-lg md:text-xl lg:text-3xl xl:text-7xl"
				>
					Coming soon...
				</h1>
			</div>
			<a routerLink="features" class="bg-pink-200 w-fit rounded-lg p-4">
				Features
			</a>
		</main>
	`,
	styleUrls: ['./app.component.css'],
})
export class AppComponent {}
