import { TestBed } from '@angular/core/testing';

import { DoctorDashboardService } from './doctor-dashboard.service';

describe('DoctorDashboardService', () => {
  let service: DoctorDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
