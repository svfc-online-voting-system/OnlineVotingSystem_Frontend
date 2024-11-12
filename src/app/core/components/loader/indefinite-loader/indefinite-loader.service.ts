import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
	providedIn: 'root',
})
export class IndefiniteLoaderService {
	private loading = new BehaviorSubject<boolean>(false);
	public readonly loading$ = this.loading.asObservable();

	show() {
		this.loading.next(true);
	}

	hide() {
		this.loading.next(false);
	}
}
