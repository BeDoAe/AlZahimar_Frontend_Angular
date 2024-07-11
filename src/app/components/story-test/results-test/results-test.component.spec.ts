import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsTestComponent } from './results-test.component';

describe('ResultsTestComponent', () => {
  let component: ResultsTestComponent;
  let fixture: ComponentFixture<ResultsTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResultsTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
