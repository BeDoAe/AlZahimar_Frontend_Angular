import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryTestComponent } from './story-test.component';

describe('StoryTestComponent', () => {
  let component: StoryTestComponent;
  let fixture: ComponentFixture<StoryTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoryTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoryTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
