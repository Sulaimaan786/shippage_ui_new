import { TestBed } from '@angular/core/testing';

import { RequestQuoteService } from './request-quote.service';

describe('RequestQuoteService', () => {
  let service: RequestQuoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestQuoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
