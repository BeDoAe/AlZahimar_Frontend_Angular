import { TestBed } from '@angular/core/testing';

import { BrowseSharedService } from './browse-shared.service';

describe('BrowseSharedService', () => {
  let service: BrowseSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowseSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
