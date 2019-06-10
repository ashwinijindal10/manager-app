import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { EmailEditorConfirmationDialogComponent } from './email-editor-confirmation-dialog.component';

describe('EmailEditorConfirmationDialogComponent', () => {
  let component: EmailEditorConfirmationDialogComponent;
  let fixture: ComponentFixture<EmailEditorConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailEditorConfirmationDialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('on No', () => {
    component.onNo();
    expect(component.onNo).toBeTruthy();
  });
  it('on Yes', () => {
    component.onYes();
    expect(component.onYes).toBeTruthy();
  });
});
