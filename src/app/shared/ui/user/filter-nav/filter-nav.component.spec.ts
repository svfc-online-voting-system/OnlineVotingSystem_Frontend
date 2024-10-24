import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FilterNavComponent } from './filter-nav.component';

describe('FilterNavComponent', () => {
	let component: FilterNavComponent;
	let fixture: ComponentFixture<FilterNavComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FilterNavComponent],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							paramMap: {
								get: () => 'mockId',
							},
						},
						params: of({ id: 'mockId' }),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(FilterNavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
