import { TestBed } from '@angular/core/testing';

import { InstantRatesService } from './instant-rates.service';

describe('InstantRatesService', () => {
  let service: InstantRatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstantRatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
