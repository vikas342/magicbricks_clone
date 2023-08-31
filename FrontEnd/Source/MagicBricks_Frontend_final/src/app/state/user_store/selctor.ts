import { createSelector, createFeatureSelector } from '@ngrx/store';
import { getalluser_model } from '../../Model/get_all_users.model';
import { All_properties } from '../../Model/get_all_property.model';


export const selectusersdata = createFeatureSelector<ReadonlyArray<getalluser_model>>('data');


// export const selectpropertydata = createFeatureSelector<ReadonlyArray<All_properties>>('data');


export const userlength= createSelector(
  selectusersdata,
  (x)=> {
    return x.length;
  }
)

// export const propertylength= createSelector(
//   selectpropertydata,
//   (x)=> {
//     return x.length;
//   }
// )
