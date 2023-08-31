import { createReducer,on } from "@ngrx/store";
import { All_properties } from "src/app/Model/get_all_property.model";
import { GetAllpropertySuccess } from "./action";

export const initialState: Array<All_properties> = [];

export const propertyreducer=createReducer(
  initialState,
    on(GetAllpropertySuccess,(state,{data2})=>data2),
);
