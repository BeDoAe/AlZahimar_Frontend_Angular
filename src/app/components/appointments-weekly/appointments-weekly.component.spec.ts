import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsWeeklyComponent } from './appointments-weekly.component';

describe('AppointmentsWeeklyComponent', () => {
  let component: AppointmentsWeeklyComponent;
  let fixture: ComponentFixture<AppointmentsWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsWeeklyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentsWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
