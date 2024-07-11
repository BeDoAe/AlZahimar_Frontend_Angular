import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorVisitedProfileComponent } from './doctor-visited-profile.component';

describe('DoctorVisitedProfileComponent', () => {
  let component: DoctorVisitedProfileComponent;
  let fixture: ComponentFixture<DoctorVisitedProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorVisitedProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorVisitedProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
