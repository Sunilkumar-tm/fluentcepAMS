import { TestBed } from '@angular/core/testing';

import { CheckIncheckOutService } from './check-incheck-out.service';

describe('CheckIncheckOutService', () => {
  let service: CheckIncheckOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckIncheckOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
