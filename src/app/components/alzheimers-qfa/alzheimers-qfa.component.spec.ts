import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlzheimersQFAComponent } from './alzheimers-qfa.component';

describe('AlzheimersQFAComponent', () => {
  let component: AlzheimersQFAComponent;
  let fixture: ComponentFixture<AlzheimersQFAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlzheimersQFAComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlzheimersQFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
