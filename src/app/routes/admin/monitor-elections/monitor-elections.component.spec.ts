import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MonitorElectionsComponent } from './monitor-elections.component';
import { provideHttpClient } from '@angular/common/http';

describe('MonitorElectionsComponent', () => {
	let component: MonitorElectionsComponent;
	let fixture: ComponentFixture<MonitorElectionsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MonitorElectionsComponent],
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

		fixture = TestBed.createComponent(MonitorElectionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
