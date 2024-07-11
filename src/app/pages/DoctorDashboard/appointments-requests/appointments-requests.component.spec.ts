import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsRequestsComponent } from './appointments-requests.component';

describe('AppointmentsRequestsComponent', () => {
  let component: AppointmentsRequestsComponent;
  let fixture: ComponentFixture<AppointmentsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
