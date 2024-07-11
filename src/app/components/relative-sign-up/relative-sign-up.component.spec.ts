import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativeSignUpComponent } from './relative-sign-up.component';

describe('RelativeSignUpComponent', () => {
  let component: RelativeSignUpComponent;
  let fixture: ComponentFixture<RelativeSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelativeSignUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelativeSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
