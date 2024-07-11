import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndgameComponent } from './endgame.component';

describe('EndgameComponent', () => {
  let component: EndgameComponent;
  let fixture: ComponentFixture<EndgameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EndgameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EndgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
