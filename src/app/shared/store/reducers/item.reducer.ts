import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createSelector } from "@ngrx/store";
import { Item } from '../../model/item';
import { ItemsApiActions } from '../actions';


export interface State extends EntityState<Item> {
    activeItemId: string | null;
  }
  
  export const adapter = createEntityAdapter<Item>();
  
  export const initialState = adapter.getInitialState({
    activeItemId: null
  });

  
export function reducer(
    state = initialState,
    action: ItemsApiActions.ItemsApiActions
  ): State {
    switch (action.type) {
      case ItemsApiActions.itemsLoaded.type:
        return adapter.addAll(action.items, state);
  
      /*case ItemsApiActions.selectBook.type:
        return {
          ...state,
          activeBookId: action.bookId
        };
  
      case BooksPageActions.clearSelectedBook.type:
        return {
          ...state,
          activeBookId: null
        };
  */
      case ItemsApiActions.itemCreated.type:
        return adapter.addOne(action.item, {
          ...state,
          activeId: action.item.id
        });
  
      case ItemsApiActions.itemUpdated.type:
        return adapter.updateOne(
          { id: action.item.id, changes: action.item },
          { ...state, activeId: action.item.id }
        );
  
      case ItemsApiActions.itemDeleted.type:
        return adapter.removeOne(action.item.id, {
          ...state,
          activeItemId: null
        });
  
      default:
        return state;
    }
  }
  
  export const { selectAll, selectEntities } = adapter.getSelectors();
  export const selectActiveItemId = (state: State) => state.activeItemId;
  export const selectActiveItem = createSelector(
    selectEntities,
    selectActiveItemId,
    (entities, itemId) => (itemId ? entities[itemId] : null)
  );
  // export const selectEarningsTotals = createSelector(
  //   selectAll,
  //   books =>
  //     books.reduce((total, book) => {
  //       return total + parseInt(`${book.earnings}`, 10) || 0;
  //     }, 0)
  // );
  