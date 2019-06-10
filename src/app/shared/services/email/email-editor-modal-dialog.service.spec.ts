import { TestBed } from '@angular/core/testing';

import { EmailEditorModalDialogService } from './email-editor-modal-dialog.service';

describe('EmailEditorModalDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailEditorModalDialogService = TestBed.get(EmailEditorModalDialogService);
    expect(service).toBeTruthy();
  });
});
