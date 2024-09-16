import { TestBed } from '@angular/core/testing';

import { SignupValidatorsService } from './signup-validators.service';

describe('SignupValidatorsService', () => {
	let service: SignupValidatorsService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(SignupValidatorsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
