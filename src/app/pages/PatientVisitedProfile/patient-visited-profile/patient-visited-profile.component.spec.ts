import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVisitedProfileComponent } from './patient-visited-profile.component';

describe('PatientVisitedProfileComponent', () => {
  let component: PatientVisitedProfileComponent;
  let fixture: ComponentFixture<PatientVisitedProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientVisitedProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientVisitedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
