import { createFeatureSelector, createSelector } from "@ngrx/store";
import { All_properties } from "src/app/Model/get_all_property.model";



export const selectpropertydata = createFeatureSelector<ReadonlyArray<All_properties>>('data2');

export const propertylength= createSelector(
  selectpropertydata,
  (x)=> {
    return x.length;
  }
)
