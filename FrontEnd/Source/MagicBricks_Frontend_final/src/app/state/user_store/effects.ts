import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, EMPTY, mergeMap } from 'rxjs';
import {
   GetAlluser,
  GetAlluserSuccess,
  Updateprofile,
  deleteuser,
} from './action';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class dataeffect {
  userserv: any;
  constructor(private actions$: Actions, private api: ApiService) {}

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAlluser),
      exhaustMap(() =>
        this.api.get_all_users().pipe(
          map((data) => GetAlluserSuccess({ data })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  // loadPropertyies$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(GetAllproperty),
  //     exhaustMap(() =>
  //       this.api.get_allpropertylistings().pipe(
  //         map((data) => GetAlluserSuccess({ data })),
  //         catchError(() => EMPTY)
  //       )
  //     )
  //   )
  // );

  upddata$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Updateprofile),
      mergeMap(({ uid, data }) =>
        this.api.updateUserProfileData(uid, data).pipe(
          map((data) => {
            return GetAlluser();
          })
        )
      )
    )
  );

  //   deleteuser$ = createEffect(()=>
  //   this.actions$.pipe(
  //     ofType(deleteuser),
  //     mergeMap(({uid})=>
  //       this.api.deleteuser(uid).pipe(
  //         map((data)=>{
  //           return GetAlluser();
  //         })
  //       )
  //     )
  //   )
  // );

  // deleteuser$=createEffect(()=>

  //     this.actions$.pipe(

  //         ofType(deleteuser),

  //         mergeMap(({uid})=>

  //         this.api.deleteuser(uid).pipe(

  //         )

  //         )

  //     ),

  //     {dispatch:false}

  //     )
}
