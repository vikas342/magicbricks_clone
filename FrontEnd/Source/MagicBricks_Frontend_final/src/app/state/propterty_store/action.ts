import { createAction, props } from "@ngrx/store";
import { All_properties } from "src/app/Model/get_all_property.model";

export const GetAllpropertySuccess = createAction('getall property Success',props<{data2 : All_properties[]}>())
export const GetAllproperty  = createAction('getall property');
export const GetAllpropertyFailure = createAction('getall property failure');
