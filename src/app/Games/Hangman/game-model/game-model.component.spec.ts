import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModelComponent } from './game-model.component';

describe('GameModelComponent', () => {
  let component: GameModelComponent;
  let fixture: ComponentFixture<GameModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
