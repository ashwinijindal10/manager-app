import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage = 1;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [10, 30, 50, 100];
  @Input() totalSize: number;
  @Input() paginationFor: string;
  @Output() action: EventEmitter<object> = new EventEmitter();

  alldata: object;
  // selectedPageSize: number;

  constructor() {}

  ngOnInit() {
    // this.selectedPageSize = this.pageSize;
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.emitData();
  }

  previousPage() {
    this.currentPage = this.currentPage - 1;
    this.emitData();
  }

  jumpToPage(page) {
    this.currentPage = parseInt(page, 10);
    this.emitData();
  }

  updatePageSize() {
    this.currentPage = 1;
    // this.pageSize = this.selectedPageSize;
    this.emitData();
  }

  emitData() {
    this.alldata = {
      currentPage: this.currentPage,
      pageSize: this.pageSize
    };
    this.action.emit(this.alldata);
  }

  updateMaxNumber() {
    if (this.currentPage > this.totalSize) {
      this.currentPage = this.totalSize;
    } else if (this.currentPage < 1) {
      this.currentPage = 1;
    }
  }
}
