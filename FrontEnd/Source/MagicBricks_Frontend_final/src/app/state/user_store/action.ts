import { createAction, props } from "@ngrx/store";
import { getalluser_model, updateuserform } from "src/app/Model/get_all_users.model";



//user store

export const GetAlluserSuccess = createAction('getall user Success',props<{data : getalluser_model[]}>())
export const GetAlluser  = createAction('getall user');
export const GetAlluserFailure = createAction('getall user failure');


//



export const Updateprofile  = createAction('Updateprofile user',props<{uid:number,data:updateuserform}>());
// export const Updateprofilesuccess = createAction('getall user Success',props<{data:getalluser_model}>())
// export const UpdateprofileFailure = createAction('getall user failure');


export const deleteuser= createAction('delete user',props<{uid:number}>());





//property store

