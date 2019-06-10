import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../modules/dashboard/home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: HomeComponent
      },
      {
        path: 'prospect',
        loadChildren:
          '../modules/prospect-details/prospect-details.module#ProspectDetailsModule'
      },
      {
        path: 'prospect/import',
        loadChildren:
          '../modules/prospect-bulk-upload/prospect-bulk-upload.module#ProspectBulkUploadModule'
      },
      {
        path: 'prospect/previousimport',
        loadChildren:
          '../modules/prospect-import-history/prospect-import-history.module#ProspectImportHistoryModule'
      },
      {
        path: 'campaign',
        loadChildren: '../modules/campaign/campaign.module#CampaignModule'
      },
      {
        path: 'templates',
        loadChildren:
          '../modules/email-templates/email-templates.module#EmailTemplatesModule'
      },
      {
        path: 'jobs',
        loadChildren: '../modules/jobs/jobs.module#JobsModule'
      },
      {
        path: 'message',
        loadChildren:
          '../modules/message-center/message-center.module#MessageCenterModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
