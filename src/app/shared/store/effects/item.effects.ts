import { Effect, Actions, ofType } from "@ngrx/effects";
import {  ItemsApiActions } from "../actions";
import { ItemService } from "../../services/item.service";
import {
  mergeMap,
  map,
  catchError,
  exhaustMap,
  concatMap
} from "rxjs/operators";
import { EMPTY } from "rxjs";
import { Injectable } from '@angular/core';


@Injectable()
export class ItemsApiEffects {
  @Effect()
  loadItems$ = this.actions$.pipe(
    ofType(ItemsApiActions.itemsLoaded.type),
    exhaustMap(() =>
      this.itemService.items.pipe(
        map(items =>ItemsApiActions.itemsLoaded({ items })),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  createItem$ = this.actions$.pipe(
    ofType(ItemsApiActions.itemCreated.type),
    mergeMap(action =>
      this.itemService.create(action.item).pipe(
        map(item => ItemsApiActions.itemCreated({ item })),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  updateBook$ = this.actions$.pipe(
    ofType(ItemsApiActions.itemUpdated.type),
    concatMap(action =>
      this.itemService.update(action.item.id, action.item).pipe(
        map(item => ItemsApiActions.itemUpdated({ item })),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  deleteBook$ = this.actions$.pipe(
    ofType(ItemsApiActions.itemDeleted.type),
    mergeMap(action =>
      this.itemService.delete(action.item.id).pipe(
        map(() => ItemsApiActions.itemDeleted({ item: action.item })),
        catchError(() => EMPTY)
      )
    )
  );

  constructor(
    private itemService: ItemService,
    private actions$: Actions<
       ItemsApiActions.ItemsApiActions
    >
  ) {}
}
