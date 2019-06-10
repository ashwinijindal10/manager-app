import { TestBed } from '@angular/core/testing';

import { EmailService } from './email.service';
import { HttpApiService } from '../../services/http-api.service';
import { EmailData } from '../../model/email/email-data';
import { EmailList } from '../../model/email/email-list';

describe('EmailService', () => {

  let service: EmailService;
  const responseSendMail: any = {
    'data': 'check17@mail.com,test@gmail.com', 'state': true,
    'message': { 'success': 'Mail sent successfully', 'errors': [] }
  };
  const responseSaveMail: any = {
    'data': 'check17@mail.com,test@gmail.com', 'state': true,
    'message': { 'success': 'Mail save successfully', 'errors': [] }
  };
  const data: EmailData = {
    id: '',
    type: '',
    body: '<p>test</p>',
    emails: [{
      email: 'check17@mail.com',
      prospectId: 'abcd'
    },
    {
      email: 'test@gmail.com',
      prospectId: 'xyz'
    }],
    subject: 'Subject'
  };
  const sendPath = 'mail/send';
  const savePath = 'mail/save';
  let httpApiServiceMock = { postData: (_sendPath: any, _data: any) => responseSendMail };

  it('#sendEmail should return success response from service', () => {
    service = new EmailService(httpApiServiceMock as HttpApiService);
    expect(service.sendEmail(data)).toEqual(responseSendMail);
  });

  it('#saveEmail should return success response from service', () => {
    httpApiServiceMock = { postData: (_savePath: any, _data: any) => responseSaveMail };
    service = new EmailService(httpApiServiceMock as HttpApiService);
    expect(service.saveDraft(data)).toEqual(responseSaveMail);
  });

});
