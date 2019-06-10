import { ProspectEmailDetail } from './prospect-email-detail';
import { EmailEditorSourceType } from './email-editor-source-type';

export interface EmailEditorInput {
    emailEditorSourceType: EmailEditorSourceType;
    prospectEmailDetailList: ProspectEmailDetail[];
    id: string; // Draftid or sentid or default it will be empty
    subject: string;
    message: string;
    jobId?: number;
  }
