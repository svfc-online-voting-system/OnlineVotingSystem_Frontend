import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { PollEventDetailsComponent } from './poll-event-details.component';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('PollEventDetailsComponent', () => {
	let component: PollEventDetailsComponent;
	let fixture: ComponentFixture<PollEventDetailsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PollEventDetailsComponent],
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

		fixture = TestBed.createComponent(PollEventDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
