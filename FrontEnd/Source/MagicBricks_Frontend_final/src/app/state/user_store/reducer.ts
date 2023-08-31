import { createReducer, on } from '@ngrx/store';
 import {
   GetAlluserSuccess,
  Updateprofile,
  deleteuser,
} from './action';
import { getalluser_model } from 'src/app/Model/get_all_users.model';

export const initialState: Array<getalluser_model> = [];

export const apireducer = createReducer(
  initialState,
  on(GetAlluserSuccess, (state, { data }) => data),

  //   on(Updateprofilesuccess,(state,{data})=>{
  // console.log(`1`, data);
  // const x = state.find(x => x.uId === data.uId)
  // console.log(`2`, x);
  //    return state.map(x => x.uId === data.uId ? data : x)

  //   }
  //      )
  on(Updateprofile, (state, { uid, data }) => {
    const updated = state.map((b: any) => (b.uid == uid ? data : b));

    return { ...state, updated };
  })

  // on(deleteuser,(state,{uid})=>state.filter((x:any)=> x.uid!=uid))
  //on(delcarreq,(state,{carid})=>state.filter(x=>x.carid!=carid))
);

// export const propertyreducer = createReducer(
//   initialState,
//   on(GetAllpropertySuccess, (state, { data }) => data)
// );


