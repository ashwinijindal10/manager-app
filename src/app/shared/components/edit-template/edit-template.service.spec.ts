import { TestBed } from '@angular/core/testing';

import { EditTemplateService } from './edit-template.service';

describe('EditTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditTemplateService = TestBed.get(EditTemplateService);
    expect(service).toBeTruthy();
  });
});
