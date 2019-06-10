import { EmailList } from './email-list';

export interface EmailData {
    id: string;
    type: string;
    emails: EmailList[];
    subject: string;
    body: string;
    jobId?: number;
}
