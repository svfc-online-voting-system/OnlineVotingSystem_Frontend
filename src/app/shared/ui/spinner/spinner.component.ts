import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-spinner',
	standalone: true,
	imports: [MatProgressSpinnerModule],
	template: ` <div class="p-4 flex flex-col justify-center items-center w-full">
		<p class="text-center">We're working on it...</p>
		<mat-spinner diameter="35"></mat-spinner>
	</div>`,
})
export class SpinnerComponent {}
