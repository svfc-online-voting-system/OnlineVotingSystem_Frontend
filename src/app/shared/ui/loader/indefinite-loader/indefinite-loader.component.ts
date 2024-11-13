import { Component, inject } from '@angular/core';
import { IndefiniteLoaderService } from '@app/core/components/loader/indefinite-loader/indefinite-loader.service';
import { NgIf } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-indefinite-loader',
	standalone: true,
	imports: [MatProgressBarModule, NgIf, AsyncPipe],
	template: `
		<div
			class="progress-bar-container"
			*ngIf="loaderService.loading$ | async">
			<mat-progress-bar mode="indeterminate"></mat-progress-bar>
		</div>
	`,
	styleUrls: ['./indefinite-loader.component.scss'],
})
export class IndefiniteLoaderComponent {
	public readonly loaderService = inject(IndefiniteLoaderService);
}
