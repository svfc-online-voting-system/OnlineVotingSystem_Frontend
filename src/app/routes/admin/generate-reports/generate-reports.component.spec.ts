import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GenerateReportsComponent } from './generate-reports.component';
import { provideHttpClient } from '@angular/common/http';

describe('GenerateReportsComponent', () => {
	let component: GenerateReportsComponent;
	let fixture: ComponentFixture<GenerateReportsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GenerateReportsComponent],
			providers: [
				provideHttpClient(),
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: { paramMap: { get: () => 'mockId' } },
						params: of({ id: 'mockId' }),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(GenerateReportsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
