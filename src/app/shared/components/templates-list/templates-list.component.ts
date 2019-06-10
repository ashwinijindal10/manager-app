import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';

import { TemplatesListService } from './templates-list.service';
import { TemplateItem } from '../template-content/template';
import { TemplateList } from './templateList';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplatesListComponent implements OnInit, AfterViewChecked {
  allTemplateCarouselWidth = -1;
  alltemplateList: TemplateList;
  myTemplateList: Array<object> = [];
  availableTemplateTypes: Array<object> = [];
  availableMyTemplateTypes = [];
  availableTemplateCategory: Array<object> = [];
  myTemplateListCount = [];
  myTemplateVisited = false;
  selectedAllTempType = 'All';
  selectedBrandedType = 'All';
  selectedMyTempType = 'All';
  selectedCategory = 'AT';

  myTemplatesCode = 'O';
  allCode = 'All';

  templateSubscription: Subscription;

  @Input() actionText = 'COPY';
  @Input() showCreate = false;
  @Output() action: EventEmitter<TemplateItem> = new EventEmitter();

  @ViewChild('sliderWrapper') sliderWrapper: ElementRef;

  constructor(private templatesListService: TemplatesListService) {}

  ngOnInit() {
    this.getMasterData();
  }

  ngAfterViewChecked() {
    if (this.sliderWrapper && this.allTemplateCarouselWidth === -1) {
      this.allTemplateCarouselWidth = this.sliderWrapper.nativeElement.offsetWidth;
    }
  }

  /*to fetch the master data used for static label*/
  getMasterData() {
    this.templatesListService.getMasterData().subscribe(response => {
      const { state } = response;

      if (state) {
        const {
          data: { types }
        } = response;
        const {
          data: { categories }
        } = response;
        const {
          data: { statuses }
        } = response;

        this.formType(types);
        this.formCategory(categories);

        this.availableMyTemplateTypes = statuses;
      }

      // this.showTemplateList(this.availableTemplateTypes[0], this.availableTemplateCategory[0]);
    });
  }

  formCategory(data) {
    const defaultCategory = {
      code: this.allCode,
      value: 'All'
    };

    this.availableTemplateCategory = data;

    this.availableTemplateCategory.unshift(defaultCategory);
  }

  formType(data) {
    const defaultType = {
      code: this.allCode,
      value: 'ALL TEMPLATES'
    };

    data.unshift(defaultType);

    data.forEach(value => {
      value.selectedCategory = this.allCode;
    });

    this.availableTemplateTypes = data;
  }

  /*function to call the showTemplateList when the tabs are clicked*/
  callFromCategory(selectedTab) {
    this.alltemplateList = null;

    this.showTemplateList(
      this.availableTemplateTypes[selectedTab.index],
      this.availableTemplateCategory[0]
    );
  }

  /*function to fetch the template list when called also updates the selectted
  category this the active state is maintained*/
  showTemplateList(category, type) {
    category.selectedCategory = type.code;
    this.alltemplateList = null;

    if (this.templateSubscription) {
      this.templateSubscription.unsubscribe();
    }

    this.templateSubscription = this.templatesListService
      .getTemplateList(category.code, type.code)
      .subscribe(response => {
        const { state } = response;

        if (state) {
          const { data } = response;
          const {
            data: { allTemplates }
          } = response;
          if (category.code !== this.myTemplatesCode) {
            if (this.showCreate && category.code === this.allCode) {
              allTemplates.unshift({});
            }
            this.alltemplateList = data;
          } else {
            this.formMyTemplates(data);
            this.myTemplateVisited = true;
          }
        }
      });
  }

  /* to emit the selected template data */
  performAction(template: TemplateItem) {
    this.action.emit(template);
  }

  /*to form the data needed for the My template tab section*/
  formMyTemplates(data) {
    this.availableMyTemplateTypes.forEach(value => {
      this.myTemplateList[value.code] = data.allTemplates.filter(obj => {
        return obj.currentStatus === value.code;
      });
      this.myTemplateListCount[value.code] = data.allTemplates.filter(innerData => {
        return innerData.currentStatus === value.code;
      }).length;
    });
  }
}
