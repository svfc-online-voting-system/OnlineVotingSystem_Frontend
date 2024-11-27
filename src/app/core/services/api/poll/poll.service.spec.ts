import { TestBed } from '@angular/core/testing';
import { PollService } from './poll.service';
import { provideHttpClient } from '@angular/common/http';

describe('PollService', () => {
	let service: PollService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient()],
		});
		service = TestBed.inject(PollService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
