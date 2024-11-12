import { TestBed } from '@angular/core/testing';

import { VotingEventService } from './voting-event.service';

describe('VotingEventService', () => {
	let service: VotingEventService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(VotingEventService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
