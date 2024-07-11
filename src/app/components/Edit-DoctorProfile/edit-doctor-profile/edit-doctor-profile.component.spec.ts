import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorProfileComponent } from './edit-doctor-profile.component';

describe('EditDoctorProfileComponent', () => {
  let component: EditDoctorProfileComponent;
  let fixture: ComponentFixture<EditDoctorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDoctorProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDoctorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
