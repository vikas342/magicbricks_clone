import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, EMPTY } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
 import { GetAllproperty, GetAllpropertySuccess } from './action';

@Injectable()
export class property_effects {
  constructor(private actions$: Actions, private api: ApiService) {}


  loadproperties$=createEffect(() =>
  this.actions$.pipe(
    ofType(GetAllproperty),
    exhaustMap(() =>
      this.api.get_all_property().pipe(
        map((data2) => GetAllpropertySuccess({ data2 })),
        catchError(() => EMPTY)
      )
    )
  )
);
}
