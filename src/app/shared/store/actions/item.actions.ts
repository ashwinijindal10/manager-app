import { createAction, props } from '@ngrx/store'
import { Item } from '../../model/item';

export const itemsLoaded = createAction(
    "[Items API] Item Loaded Success",
    props<{ items: Item[] }>()
  );
  
  export const itemCreated = createAction(
    "[Items API] Item Created",
    props<{ item: Item }>()
  );
  
  export const itemUpdated = createAction(
    "[Items API] Item Updated",
    props<{ item: Item }>()
  );
  
  export const itemDeleted = createAction(
    "[Items API] Item Deleted",
    props<{ item: Item }>()
  );
  
  export type ItemsApiActions = ReturnType<
    | typeof itemsLoaded
    | typeof itemCreated
    | typeof itemUpdated
    | typeof itemDeleted
  >;
  