import { TestBed } from '@angular/core/testing';

import { LoginValidatorsService } from './login-validators.service';

describe('LoginValidatorsService', () => {
  let service: LoginValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
