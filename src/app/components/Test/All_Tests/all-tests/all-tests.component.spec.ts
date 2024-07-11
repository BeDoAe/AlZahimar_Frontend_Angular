import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTestsComponent } from './all-tests.component';

describe('AllTestsComponent', () => {
  let component: AllTestsComponent;
  let fixture: ComponentFixture<AllTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
