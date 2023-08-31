import { TestBed } from '@angular/core/testing';

import { SerchresultService } from './serchresult.service';

describe('SerchresultService', () => {
  let service: SerchresultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerchresultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
