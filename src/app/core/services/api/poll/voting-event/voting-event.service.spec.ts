import { TestBed } from '@angular/core/testing';
import { VotingEventService } from './voting-event.service';
import { provideHttpClient } from '@angular/common/http';

describe('VotingEventService', () => {
	let service: VotingEventService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient()],
		});
		service = TestBed.inject(VotingEventService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
