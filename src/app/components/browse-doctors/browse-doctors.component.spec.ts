import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseDoctorsComponent } from './browse-doctors.component';

describe('BrowseDoctorsComponent', () => {
  let component: BrowseDoctorsComponent;
  let fixture: ComponentFixture<BrowseDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseDoctorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
