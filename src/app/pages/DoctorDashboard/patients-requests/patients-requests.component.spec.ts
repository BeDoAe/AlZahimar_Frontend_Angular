import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsRequestsComponent } from './patients-requests.component';

describe('PatientsRequestsComponent', () => {
  let component: PatientsRequestsComponent;
  let fixture: ComponentFixture<PatientsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientsRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
