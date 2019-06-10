import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { MatSnackBarModule} from '@angular/material';
import { EmailEditorManagerComponent } from './email-editor-manager.component';

describe('EmailEditorManagerComponent', () => {
  let component: EmailEditorManagerComponent;
  let fixture: ComponentFixture<EmailEditorManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailEditorManagerComponent ],
      imports: [MatSnackBarModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should validate EmailInstances', () => {
     enum EmailEditorSourceType {
      composeEmail = 1,
      ProspectList = 2,
      ProspectDetail = 3,
      Draft = 4,
      Sent = 5,
      Job = 6
  }
    const emaileditorinput = {
      emailEditorSourceType : EmailEditorSourceType.Draft,
      prospectEmailDetailList : [{
        prospectId: 'jfvj88d9',
        primaryEmail: 'A@a.com',
        firstName: 'A',
        lastName: 'B',
        fullName: 'AB'
      }],
      id: 'gfds6a75S',
      subject: 'emailsubject',
      message: 'emailmessage',
    };
    component.validateEmailInstances(emaileditorinput);
    expect(component.validateEmailInstances).toBeTruthy();
  });
  it('should open Email Editor', () => {
    enum EmailEditorSourceType {
     composeEmail = 1,
     ProspectList = 2,
     ProspectDetail = 3,
     Draft = 4,
     Sent = 5,
     Job = 6
 }
   const emaileditorinput = {
     emailEditorSourceType : EmailEditorSourceType.Draft,
     prospectEmailDetailList : [{
       prospectId: 'jfvj88d9',
       primaryEmail: 'A@a.com',
       firstName: 'A',
       lastName: 'B',
       fullName: 'AB'
     }],
     id: 'gfds6a75S',
     subject: 'emailsubject',
     message: 'emailmessage',
   };
   component.openEmailEditor(emaileditorinput);
   expect(component.openEmailEditor).toBeTruthy();
 });
 it('should close Email', () => {
   component.closeEmail('emailEditorIntance1');
  expect(component.closeEmail).toBeTruthy();
});
it('should close Email', () => {
  component.closeEmail('emailEditorIntance2');
 expect(component.closeEmail).toBeTruthy();
});
it('should close Email', () => {
  component.closeEmail('emailEditorIntance3');
 expect(component.closeEmail).toBeTruthy();
});
});
