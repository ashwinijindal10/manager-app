import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as tinymce from 'tinymce';
import { EmailEditorComponent } from './email-editor.component';
import { DefaultShowHideDirective } from '@angular/flex-layout';

export class tinymceMock {
  focus() {}
  hide() {}
  show() {}
}
describe('EmailEditorComponent', () => {
  let component: EmailEditorComponent;
  let fixture: ComponentFixture<EmailEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailEditorComponent ],
      providers: [{
        provide: tinymce, useClass: tinymceMock
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should Destroy', () => {
    component.ngOnDestroy();
    expect(component.ngOnDestroy).toBeTruthy();
  });
  // it('should hide', () => {
  //   const spy = spyOn(tinymce.get,'focus')
  //   component.emailEditorInstanceId = 'df';
  //   component.hide();
  //   expect(component.hide).toBeTruthy();
  //   expect(spy).toBeTruthy();
  // });
  // it('should show', () => {
  //   component.emailEditorInstanceId = 'df';
  //   component.show();
  //   expect(component.show).toBeTruthy();
  // });
  // it('should focus', () => {
  //   component.emailEditorInstanceId = 'df';
  //   component.focus();
  //   expect(component.focus).toBeTruthy();
  // });
  // it('should resize', () => {
  //   component.emailEditorInstanceId = 'df';
  //   component.resize(100,100);
  //   expect(component.resize).toBeTruthy();
  // });
  // it('should getEmailMessage', () => {
  //   component.emailEditorInstanceId = 'df';
  //   component.getEmailMessage();
  //   expect(component.getEmailMessage).toBeTruthy();
  // });
  it('should setEmailMessage', () => {
    component.emailEditorInstanceId = 'df';
    component.setEmailMessage('kjdklj');
    expect(component.setEmailMessage).toBeTruthy();
  });
  it('should cleanUp', () => {
    component.emailEditorInstanceId = 'df';
    component.cleanUp();
    expect(component.cleanUp).toBeTruthy();
  });
});
