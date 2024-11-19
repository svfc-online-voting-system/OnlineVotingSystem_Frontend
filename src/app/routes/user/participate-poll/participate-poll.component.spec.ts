import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipatePollComponent } from './participate-poll.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ParticipatePollComponent', () => {
	let component: ParticipatePollComponent;
	let fixture: ComponentFixture<ParticipatePollComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ParticipatePollComponent],
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

		fixture = TestBed.createComponent(ParticipatePollComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
