import { TestBed } from '@angular/core/testing';

import { FitserviceService } from './fitservice.service';

describe('FitserviceService', () => {
  let service: FitserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
