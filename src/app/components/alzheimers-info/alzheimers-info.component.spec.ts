import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlzheimersInfoComponent } from './alzheimers-info.component';

describe('AlzheimersInfoComponent', () => {
  let component: AlzheimersInfoComponent;
  let fixture: ComponentFixture<AlzheimersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlzheimersInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlzheimersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
