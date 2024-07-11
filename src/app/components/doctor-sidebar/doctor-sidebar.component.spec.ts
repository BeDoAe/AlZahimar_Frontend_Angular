import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSidebarComponent } from './doctor-sidebar.component';

describe('DoctorSidebarComponent', () => {
  let component: DoctorSidebarComponent;
  let fixture: ComponentFixture<DoctorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
