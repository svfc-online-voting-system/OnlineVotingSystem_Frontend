import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPollComponent } from './edit-poll.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PollService } from '@app/core/core.module';

describe('EditPollComponent', () => {
	let component: EditPollComponent;
	let fixture: ComponentFixture<EditPollComponent>;
	let pollService: jasmine.SpyObj<PollService>;
	let router: jasmine.SpyObj<Router>;

	beforeEach(async () => {
		const pollServiceSpy = jasmine.createSpyObj('PollService', [
			'getPollData',
		]);
		const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

		await TestBed.configureTestingModule({
			imports: [EditPollComponent],
			providers: [
				provideHttpClient(),
				{ provide: PollService, useValue: pollServiceSpy },
				{ provide: Router, useValue: routerSpy },
				{
					provide: ActivatedRoute,
					useValue: {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						paramMap: of({ get: (key: string) => '1' }),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(EditPollComponent);
		component = fixture.componentInstance;
		pollService = TestBed.inject(
			PollService,
		) as jasmine.SpyObj<PollService>;
		router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should load poll data when id is present', () => {
		const mockPoll = {
			id: 1,
			title: 'Mock Poll',
			options: ['Option 1', 'Option 2'],
		};
		pollService.getPollData.and.returnValue(of(mockPoll));

		component.ngOnInit();

		expect(pollService.getPollData).toHaveBeenCalledWith(1);
		expect(component.pollTitle).toBe(mockPoll.title);
		expect(component.pollOptions).toEqual(mockPoll.options);
	});

	it('should navigate to new poll page when id is not present', () => {
		TestBed.overrideProvider(ActivatedRoute, {
			useValue: {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				paramMap: of({ get: (key: string) => null }),
			},
		});

		component.ngOnInit();

		expect(router.navigate).toHaveBeenCalledWith(['/u/new/poll']);
	});
});
