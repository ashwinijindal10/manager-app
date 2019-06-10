import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditTemplateService } from './edit-template.service';
import { TemplateItem } from '../template-content/template';
import { MatDialog } from '@angular/material';
import { PreviewTemplateComponent } from '../preview-template/preview-template.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditTemplateComponent implements OnInit {
  templateCategoriesList;

  tinyMCEConfig = {
    menubar: false,
    inline: true,
    plugins: [
      'autolink',
      'codesample',
      'link',
      'lists',
      'media',
      'paste',
      'table',
      'image',
      'quickbars'
    ],
    toolbar: [
      'undo redo | bold italic underline | fontselect fontsizeselect',
      'forecolor backcolor | alignleft aligncenter alignright alignfull | link unlink | image | numlist bullist outdent indent'
    ],
    quickbars_insert_toolbar: 'undo redo | quicktable | image',
    quickbars_selection_toolbar:
      'bold italic underline | h2 h3 | blockquote quicklink',
    contextmenu: 'inserttable | cell row column deletetable'
  };

  @Input() id = '';

  @Input() changeTemplate = false;

  @Input() editable = true;

  @Input() actionText = 'SAVE';

  @Output() action: EventEmitter<TemplateItem> = new EventEmitter();

  @Output() cancel: EventEmitter<TemplateItem> = new EventEmitter();

  template: TemplateItem = {
    category: '',
    htmlContent: '',
    htmlThumbnail: '',
    name: '',
    type: 'O'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private editTemplateService: EditTemplateService,
    private matDialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParams.id) {
      this.id = this.activatedRoute.snapshot.queryParams.id;
    }

    if (this.id && this.id !== '') {
      this.getTemplate();
    }

    if (this.editable) {
      this.getTemplateCategories();
    }
  }

  getTemplate() {
    this.editTemplateService.getTemplate(this.id).subscribe(templateData => {
      const { state } = templateData;
      if (state) {
        const { data } = templateData;
        this.template = data;
      }
    });
  }

  saveTemplate(template: TemplateItem) {
    this.action.emit(template);
  }

  getThumbnail(type) {
    const template = document.querySelector('#template');

    const options = {
      useCORS: true
    };

    // html2canvas(template, options).then(canvas => {
    //   this.template.htmlThumbnail = canvas.toDataURL();

    //   if (type === 'PREVIEW') {
    //     this.previewTemplate();
    //   } else if (type === 'SAVE') {
    //     this.saveTemplate(this.template);
    //   }
    // });
  }

  previewTemplate() {
    const tinyContent = document.querySelector('#tiny-content-section');

    const dialogRef = this.matDialog.open(PreviewTemplateComponent, {
      width: tinyContent.clientWidth + 'px',
      panelClass: 'map-field-popup',
      hasBackdrop: true,
      disableClose: true,
      data: {
        actionText: this.actionText,
        changeTemplate: this.changeTemplate,
        template: this.template
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'SAVE' || result === 'NEXT') {
        this.saveTemplate(this.template);
      } else if (result === 'CHANGE') {
        this.confirmChange();
      }
    });
  }

  confirmChange() {
    const confirmationDialog = this.matDialog.open(
      ConfirmationDialogComponent,
      {
        width: '35%',
        hasBackdrop: true,
        disableClose: true,
        panelClass: 'confirm-dialogbox',
        data: {
          message:
            'Leaving this page, Your information will be lost. Do you wish to continue to change template?',
          acceptText: 'Yes',
          rejectText: 'No'
        }
      }
    );

    confirmationDialog.afterClosed().subscribe(action => {
      if (action === 'Yes') {
        this.cancel.emit(this.template);
      }
    });
  }

  getTemplateCategories() {
    this.editTemplateService.getTemplateCategories().subscribe(data => {
      const { state } = data;
      if (state) {
        const {
          data: { categories }
        } = data;
        this.templateCategoriesList = categories;
      }
    });
  }
}
