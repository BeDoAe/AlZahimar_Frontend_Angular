import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllTestsComponent } from './admin-all-tests.component';

describe('AdminAllTestsComponent', () => {
  let component: AdminAllTestsComponent;
  let fixture: ComponentFixture<AdminAllTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAllTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAllTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
