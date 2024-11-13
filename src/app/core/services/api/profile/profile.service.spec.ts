import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { provideHttpClient } from '@angular/common/http';

describe('ProfileService', () => {
	let service: ProfileService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [provideHttpClient()],
		});
		service = TestBed.inject(ProfileService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
