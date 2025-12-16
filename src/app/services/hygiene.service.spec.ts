import { TestBed } from '@angular/core/testing';

import { HygieneService } from './hygiene.service';

describe('HygieneService', () => {
  let service: HygieneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HygieneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
