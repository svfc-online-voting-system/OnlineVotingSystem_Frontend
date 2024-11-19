import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipatePollComponent } from './participate-poll.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { VotingEventService, SnackbarService } from '@app/core/services';

describe('ParticipatePollComponent', () => {
	let component: ParticipatePollComponent;
	let fixture: ComponentFixture<ParticipatePollComponent>;
	let votingEventServiceMock: jasmine.SpyObj<VotingEventService>;
	let routerMock: jasmine.SpyObj<Router>;

	beforeEach(async () => {
		votingEventServiceMock = jasmine.createSpyObj('VotingEventService', [
			'getVotingEvent',
		]);
		routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

		votingEventServiceMock.getVotingEvent.and.returnValue(
			of({
				code: 'success',
				voting_event: {
					created_at: '',
					created_by: 0,
					description: '',
					end_date: '',
					event_type: '',
					last_modified_at: '',
					start_date: '',
					status: 'active',
					title: '',
					uuid: 'test-uuid',
					poll_options: [],
					creator_username: '',
				},
			}),
		);

		await TestBed.configureTestingModule({
			imports: [ParticipatePollComponent],
			providers: [
				provideHttpClient(),
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							params: { uuid: 'test-uuid' },
						},
					},
				},
				{
					provide: VotingEventService,
					useValue: votingEventServiceMock,
				},
				{
					provide: Router,
					useValue: routerMock,
				},
				{
					provide: SnackbarService,
					useValue: jasmine.createSpyObj('SnackbarService', [
						'showSnackBar',
					]),
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

	it('should load voting event details on init', () => {
		expect(votingEventServiceMock.getVotingEvent).toHaveBeenCalledWith(
			'test-uuid',
			'poll',
		);
		expect(component.eventDetails.uuid).toBe('test-uuid');
	});
});
