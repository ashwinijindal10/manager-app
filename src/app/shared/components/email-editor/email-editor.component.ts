import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ViewChild } from '@angular/core';
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/code';
// import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';

declare var tinymce: any;
@Component({
  selector: 'app-email-editor',
  templateUrl: './email-editor.component.html',
  styleUrls: ['./email-editor.component.scss']
})
export class EmailEditorComponent implements OnInit, OnDestroy {
  // Fields for tinymce
  @Input() emailEditorInstanceId = '';
  editor;
  @Output() sendContentLength: EventEmitter<any> = new EventEmitter();
  @ViewChild('divtinymceplaceholder') divElementRef: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Create textarea and append to component
    const textarea = this.renderer.createElement('textarea');
    textarea.id = this.emailEditorInstanceId;
    this.renderer.appendChild(this.divElementRef.nativeElement, textarea);
    // Initialize tinyMCE with new instance
    const selector = 'textarea[id=\'' + this.emailEditorInstanceId + '\']';
    tinymce.init({
      selector: selector,
      // max_height: 110,
      // min_height: 110,
      margin_top: 20,
      menubar: false,
      // plugins: [
      //   'autoresize advlist autolink lists link image charmap print preview anchor textcolor',
      //   'searchreplace visualblocks code fullscreen',
      //   'insertdatetime media table paste code wordcount'
      // ],
      plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code wordcount'
      ],
      // autoresize_overflow_padding: 50,
      // plugins: [
      //   'image table',
      // ],
      // plugins: [
      //   'advlist autolink lists link image charmap print preview anchor textcolor',
      //   'searchreplace visualblocks code fullscreen',
      //   'insertdatetime media table paste code wordcount'
      // ],
      toolbar:
        `formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify |
         bullist numlist outdent indent | removeformat | link image | table | undo redo`,
      // toolbar: 'link image | undo redo | formatselect |
      //  bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        '//www.tiny.cloud/css/codepen.min.css'
      ],
      setup: editor => {
        console.log(editor);
        if (editor.id === 'campaignMessage') {
          editor.on('blur keyup', () => {
            const content = editor.getContent();
            this.sendContentLength.emit(content.length);
          });
        }
      }
    });
  }

  ngOnDestroy() {
    this.cleanUp();
  }

  hide() {
    tinymce.get(this.emailEditorInstanceId).hide();
    tinymce.DOM.setStyle(this.emailEditorInstanceId, 'display', 'none');
  }

  show() {
    tinymce.get(this.emailEditorInstanceId).show();
  }

  focus() {
    tinymce.get(this.emailEditorInstanceId).focus();
  }

  resize(width, height) {
    if (!width) {
      width = '100%';
    }
    tinymce.get(this.emailEditorInstanceId).theme.resizeTo(width, height);
    // tinymce.get(this.emailEditorInstanceId).theme.resizeTo('100%', 140);
  }

  getEmailMessage() {
    return tinymce.get(this.emailEditorInstanceId).getContent();
  }

  setEmailMessage(message) {
    return tinymce.get(this.emailEditorInstanceId).setContent(message);
  }

  cleanUp() {
    const editorInstance = tinymce.get(this.emailEditorInstanceId);
    if (editorInstance) {
      editorInstance.remove();
    }
  }
}
