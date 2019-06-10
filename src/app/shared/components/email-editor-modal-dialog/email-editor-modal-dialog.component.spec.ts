import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditorModalDialogComponent } from './email-editor-modal-dialog.component';

describe('EmailEditorModalDialogComponent', () => {
  let component: EmailEditorModalDialogComponent;
  let fixture: ComponentFixture<EmailEditorModalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailEditorModalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
