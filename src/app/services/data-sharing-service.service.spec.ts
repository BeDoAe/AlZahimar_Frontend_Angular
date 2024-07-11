import { TestBed } from '@angular/core/testing';

import { DataSharingServiceService } from './data-sharing-service.service';

describe('DataSharingServiceService', () => {
  let service: DataSharingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSharingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
