import { TestBed } from '@angular/core/testing';

import { IndefiniteLoaderService } from './indefinite-loader.service';

describe('IndefiniteLoaderService', () => {
  let service: IndefiniteLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndefiniteLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
