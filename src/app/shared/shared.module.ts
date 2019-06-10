import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { TelephoneNumberDirective } from './directives/telephone-number.directive';
import { EditTemplateComponent } from './components/edit-template/edit-template.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { ErrorDispalyComponent } from './components/error-dispaly/error-dispaly.component';
import { TemplateContentComponent } from './components/template-content/template-content.component';
import { TemplatesListComponent } from './components/templates-list/templates-list.component';
import { MdePopoverModule } from '@material-extended/mde';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NguCarouselModule } from '@ngu/carousel';
import { PreviewTemplateComponent } from './components/preview-template/preview-template.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { LinkifyPipe } from './pipes/linkify-pipe.pipe';
import { SaveCancelComponent } from './components/save-cancel/save-cancel.component';
import { DialogAlertComponent } from './components/dialog-alert/dialog-alert.component';
import { AddNoteComponent } from './components/activity/add-note/add-note.component';
import { TempDataTableComponent } from './components/temp-data-table/temp-data-table.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { DataTableModule } from './data-table/data-table.module';
import { SpinnerComponent } from './components/loader/spinner/spinner.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ActivityNoteDetailsComponent } from './components/activity/activity-note-details/activity-note-details.component';
import {
  ActivityNoteDetailsCommentsComponent
} from './components/activity/activity-note-details-comments/activity-note-details-comments.component';
import {
  ActivityNoteDetailsCommentsDialogComponent
} from './components/activity/activity-note-details-comments-dialog/activity-note-details-comments-dialog.component';
import { EmailEditorPopupComponent } from './components/email-editor-popup/email-editor-popup.component';
import { SearchTopSectionComponent } from '../shared/components/search-top-section/search-top-section.component';
import { MessageDetailViewComponent } from './components/message-detail-view/message-detail-view.component';
import { TruncateFieldPipe } from './pipes/truncate-field.pipe';
import { QueryBuilderComponent } from '../shared/components/query-builder/query-builder.component';
import { SearchSaveDialogComponent } from '../shared/components/search-save-dialog/search-save-dialog.component';
import { EmailEditorComponent } from './components/email-editor/email-editor.component';
import { EmailEditorManagerComponent } from './components/email-editor-manager/email-editor-manager.component';
import { EmailEditorModalDialogComponent } from './components/email-editor-modal-dialog/email-editor-modal-dialog.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import {
  EmailEditorConfirmationDialogComponent
} from './components/email-editor-confirmation-dialog/email-editor-confirmation-dialog.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { CampaignConfirmationDialogComponent } from './components/campaign-confirmation-dialog/campaign-confirmation-dialog.component';
import { CustomTooltipDirective } from './directives/custom-tooltip.directive';

@NgModule({
  declarations: [
    TelephoneNumberDirective,
    DisableControlDirective,
    ErrorDispalyComponent,
    EditTemplateComponent,
    TemplateContentComponent,
    TemplatesListComponent,
    PreviewTemplateComponent,
    ConfirmationDialogComponent,
    LinkifyPipe,
    SaveCancelComponent,
    AddNoteComponent,
    TempDataTableComponent,
    AvatarComponent,
    DialogAlertComponent,
    DateFormatPipe,
    SpinnerComponent,
    PaginationComponent,
    ActivityNoteDetailsComponent,
    ActivityNoteDetailsCommentsComponent,
    ActivityNoteDetailsCommentsDialogComponent,
    EmailEditorPopupComponent,
    SearchTopSectionComponent,
    MessageDetailViewComponent,
    TruncateFieldPipe,
    QueryBuilderComponent,
    SearchSaveDialogComponent,
    EmailEditorComponent,
    EmailEditorManagerComponent,
    EmailEditorModalDialogComponent,
    TreeViewComponent,
    EmailEditorConfirmationDialogComponent,
    LoaderSpinnerComponent,
    CampaignConfirmationDialogComponent,
    CustomTooltipDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTableModule,
    MdePopoverModule,
    EditorModule,
    FlexLayoutModule,
    NguCarouselModule,
    Ng2CarouselamosModule,
    DataTableModule
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    PreviewTemplateComponent,
    DialogAlertComponent,
    SearchSaveDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DataTableModule,
    DisableControlDirective,
    MdePopoverModule,
    EditorModule,
    FlexLayoutModule,
    NguCarouselModule,
    TemplateContentComponent,
    TemplatesListComponent,
    ConfirmationDialogComponent,
    EditTemplateComponent,
    LinkifyPipe,
    SaveCancelComponent,
    AddNoteComponent,
    AvatarComponent,
    DialogAlertComponent,
    DateFormatPipe,
    TempDataTableComponent,
    SpinnerComponent,
    PaginationComponent,
    ActivityNoteDetailsComponent,
    ActivityNoteDetailsCommentsComponent,
    ActivityNoteDetailsCommentsDialogComponent,
    EmailEditorPopupComponent,
    SearchTopSectionComponent,
    MessageDetailViewComponent,
    TruncateFieldPipe,
    QueryBuilderComponent,
    SearchSaveDialogComponent,
    EmailEditorComponent,
    EmailEditorModalDialogComponent,
    EmailEditorManagerComponent,
    TreeViewComponent,
    EmailEditorConfirmationDialogComponent,
    LoaderSpinnerComponent,
    CampaignConfirmationDialogComponent,
    CustomTooltipDirective
  ]
})
export class SharedModule { }
