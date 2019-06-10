import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
  Input,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'app-campaign-confirmation-dialog',
  templateUrl: './campaign-confirmation-dialog.component.html',
  styleUrls: ['./campaign-confirmation-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignConfirmationDialogComponent implements OnInit, OnChanges {
  campaignDate;
  @Input() scheduledDate;
  @Output() confirmMessage = new EventEmitter<boolean>();
  @Output() checkboxvalue = new EventEmitter<boolean>();
  @Input() message: string;
  @Input() campaignName: string;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.campaignDate = this.scheduledDate;
    console.log(this.campaignDate);
  }

  onNo() {
    this.confirmMessage.emit(false);
  }

  onYes() {
    this.confirmMessage.emit(true);
  }

  checkboxselected(event) {
    if (event.checked) {
      this.checkboxvalue.emit(true);
    } else {
      this.checkboxvalue.emit(false);
    }
  }
}
