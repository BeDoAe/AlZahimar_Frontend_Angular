import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonightChartComponent } from './donight-chart.component';

describe('DonightChartComponent', () => {
  let component: DonightChartComponent;
  let fixture: ComponentFixture<DonightChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonightChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonightChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
