import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndefiniteLoaderComponent } from './indefinite-loader.component';

describe('IndefiniteLoaderComponent', () => {
	let component: IndefiniteLoaderComponent;
	let fixture: ComponentFixture<IndefiniteLoaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [IndefiniteLoaderComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(IndefiniteLoaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
