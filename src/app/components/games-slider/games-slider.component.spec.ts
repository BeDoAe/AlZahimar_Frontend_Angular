import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSliderComponent } from './games-slider.component';

describe('GamesSliderComponent', () => {
  let component: GamesSliderComponent;
  let fixture: ComponentFixture<GamesSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GamesSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
