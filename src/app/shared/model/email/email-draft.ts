export interface EmailDraft {
  id: string;
  type: string;
  receipients: string[];
  subject: string;
  body: string;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  jobId?: number;
}
