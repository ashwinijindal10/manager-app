import { TestBed } from '@angular/core/testing';

import { EmailDataService } from './email-data.service';

describe('EmailDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailDataService = TestBed.get(EmailDataService);
    expect(service).toBeTruthy();
  });
});
