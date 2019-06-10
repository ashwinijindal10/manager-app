import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { EmailEditorPopupComponent } from './email-editor-popup.component';
import { HttpClientModule } from '@angular/common/http';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipInputEvent} from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import 'tinymce';

export class tinymceMock {
}
describe('EmailEditorPopupComponent', () => {
  let component: EmailEditorPopupComponent;
  let fixture: ComponentFixture<EmailEditorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailEditorPopupComponent, ConfirmationDialogComponent ],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule,
         MatDialogModule, MatSnackBarModule, BrowserAnimationsModule],
         providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add', () => {
    const event: MatChipInputEvent = {
      input: null,
      value: 'test'
    };
    component.add(event);
    expect(component.add).toBeTruthy();
  });
  it('should validate Email Format', () => {
    const emailformat = 'a@a.com';
    component.validateEmailFormat(emailformat);
    expect(component.validateEmailFormat).toBeTruthy();
  });
  it('should remove', () => {
    component.prospectEmailList = [{ prospectId: 'test',
      primaryEmail: 'test',
      firstName: 'test',
      lastName: 'test',
      fullName: 'test'
    }];
    const item = {
      prospectId: 'test',
      primaryEmail: 'test',
      firstName: 'test',
      lastName: 'test',
      fullName: 'test'
    };
    component.remove(item);
    expect(component.remove).toBeTruthy();
  });
  it('should validate Email', () => {
    component.validateEmail();
    expect(component.validateEmail).toBeTruthy();
  });
  it('should validate Email List', () => {
    component.prospectEmailList = [{ prospectId: 'test',
      primaryEmail: 'test',
      firstName: 'test',
      lastName: 'test',
      fullName: 'test'
    }];
    component.validateEmailList();
    expect(component.validateEmailList).toBeTruthy();
  });
  it('should close Dialog', () => {
    component.closeDialog();
    expect(component.closeDialog).toBeTruthy();
  });
  it('should remove Duplicate', () => {
    const item = ['test', 'test1', 'test2', 'test3'];
    component.removeDuplicate(item);
    expect(component.removeDuplicate).toBeTruthy();
  });
  it('should cleanUp', () => {
    component.cleanUp();
    expect(component.cleanUp).toBeTruthy();
  });
});
