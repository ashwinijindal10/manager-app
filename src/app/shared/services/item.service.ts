import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Observable, ObservableLike } from 'rxjs';
import { tap, map, share } from 'rxjs/operators';
import { Item, FilterState, Filter ,Option} from '../model/item';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  items: Observable<Item[]>;
  filterState: FilterState = {};
  filters: Observable<Filter[]>;

  constructor(http: HttpClient) {
    this.items = http.get<Item[]>('assets/item-data.json').pipe(
      share()
    );
    this.filters = this.items.pipe(
      map(a => this.createFilters(a))
    );
  }

  private createFilters( item: Item[]) {
    return [{
      category: 'category',
      displayName: 'Category',
      options: this.extractFilterOptions('category', item)
    }];
  }

  private extractFilterOptions(category: string, items: Item[]): Option[] {
    this.filterState[category] = '';
    return _.chain(items)
      .groupBy(category)
      .keys()
      .sort()
      .value();
  }

  public create(item:Item):Observable<Item>{
      return null;
  }

  public delete(id:number):Observable<Item>{
    return null;
  }

  public update(id:number,item:Item):Observable<Item>{
    return null;
  }
}
