import { TestBed } from '@angular/core/testing';

import { ClipboardServiceService } from './clipboard-service.service';

describe('ClipboardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClipboardServiceService = TestBed.get(ClipboardServiceService);
    expect(service).toBeTruthy();
  });
});
