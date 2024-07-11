import { TestBed } from '@angular/core/testing';

import { PatientVisitedProfileService } from './patient-visited-profile.service';

describe('PatientVisitedProfileService', () => {
  let service: PatientVisitedProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientVisitedProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
