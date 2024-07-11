import { TestBed } from '@angular/core/testing';

import { DoctorVisitedProfileService } from './doctor-visited-profile.service';

describe('DoctorVisitedProfileService', () => {
  let service: DoctorVisitedProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorVisitedProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
