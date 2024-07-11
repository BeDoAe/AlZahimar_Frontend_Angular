import { TestBed } from '@angular/core/testing';

import { RelativeRegisterServiceService } from './relative-register-service.service';

describe('RelativeRegisterServiceService', () => {
  let service: RelativeRegisterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelativeRegisterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
