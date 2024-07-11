import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificTestResultComponent } from './specific-test-result.component';

describe('SpecificTestResultComponent', () => {
  let component: SpecificTestResultComponent;
  let fixture: ComponentFixture<SpecificTestResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificTestResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecificTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
