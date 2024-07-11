import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSignUpComponent } from './doctor-sign-up.component';

describe('DoctorSignUpComponent', () => {
  let component: DoctorSignUpComponent;
  let fixture: ComponentFixture<DoctorSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSignUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
