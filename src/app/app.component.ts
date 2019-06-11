import { Component } from '@angular/core';
import { ItemService } from './shared/services/item.service';
import { Item, FilterState, Filter ,Option} from './shared/model/item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Manager-App';
  items: Observable<Item[]>;
  filterState: FilterState;
  filters: Observable<Filter[]>;

  constructor(itemService: ItemService) {
    this.items = itemService.items;
    this.filterState = itemService.filterState;
    this.filters = itemService.filters;
  }

  changeFilter(category: string, option: Option) {
    this.filterState[category] = option;
  }
}
