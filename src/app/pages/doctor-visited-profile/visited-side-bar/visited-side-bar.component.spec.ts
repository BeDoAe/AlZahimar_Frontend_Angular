import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedSideBarComponent } from './visited-side-bar.component';

describe('VisitedSideBarComponent', () => {
  let component: VisitedSideBarComponent;
  let fixture: ComponentFixture<VisitedSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitedSideBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitedSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
