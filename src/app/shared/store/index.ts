import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromItems from "./reducers/item.reducer";

export interface State {
     items: fromItems.State;
  }

export const reducers: ActionReducerMap<State> = {
    items: fromItems.reducer
  };

export const metaReducers: MetaReducer<State>[] = [];
//selectors

export const selectItemState = (state: State) => state.items;


export const selectItemEntities = createSelector(
    selectItemState,
    fromItems.selectEntities
  );
  
export const selectItems = createSelector(
    selectItemState,
    fromItems.selectAll
  );

export const selectActiveItem = createSelector(
    selectItemState,
    fromItems.selectActiveItem
  );
  