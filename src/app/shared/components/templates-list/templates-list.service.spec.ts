import { TestBed } from '@angular/core/testing';

import { TemplatesListService } from './templates-list.service';

describe('TemplatesListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplatesListService = TestBed.get(TemplatesListService);
    expect(service).toBeTruthy();
  });
});
