import { TemplateItem } from '../template-content/template';

export interface TemplateList {
  allTemplates?: TemplateItem[];
  recentlyUsedTemplates?: TemplateItem[];
  mostWidelyUsedTemplates?: TemplateItem[];
  recentlyUsedCount?: number;
  mostWideCount?: number;
  totalCount?: number;
}

