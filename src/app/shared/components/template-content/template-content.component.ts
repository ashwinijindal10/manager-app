import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdePopoverTrigger } from '@material-extended/mde';

import { TemplateItem } from './template';

@Component({
  selector: 'app-template-content',
  templateUrl: './template-content.component.html',
  styleUrls: ['./template-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateContentComponent implements OnInit {
  @Input() template: TemplateItem;

  @Input() popover = true;

  @Input() disableSelection = false;

  @Input() showCreate = false;

  @Input() actionText = 'USE';

  @Output() action: EventEmitter<TemplateItem> = new EventEmitter();

  @ViewChild(MdePopoverTrigger) mdePopoverTrigger: MdePopoverTrigger;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit () {
  }

  createTemplate () {
    this.router.navigate(['../edit'], { relativeTo: this.activatedRoute });
  }

  performAction () {
    this.mdePopoverTrigger.closePopover();

    setTimeout(() => {
      this.action.emit(this.template);
    }, 200);
  }
}
