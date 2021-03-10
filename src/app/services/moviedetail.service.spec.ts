import { TestBed } from '@angular/core/testing';

import { MoviedetailService } from './moviedetail.service';

describe('MoviedetailService', () => {
  let service: MoviedetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviedetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
