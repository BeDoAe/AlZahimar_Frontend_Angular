import { TestBed } from '@angular/core/testing';

import { StoryServicesService } from './story-services.service';

describe('StoryServicesService', () => {
  let service: StoryServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
