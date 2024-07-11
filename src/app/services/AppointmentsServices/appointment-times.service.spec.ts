import { TestBed } from '@angular/core/testing';

import { AppointmentTimesService } from './appointment-times.service';

describe('AppointmentTimesService', () => {
  let service: AppointmentTimesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentTimesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
