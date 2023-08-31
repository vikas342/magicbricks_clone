import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 import { All_properties } from '../Model/get_all_property.model';
import { environment } from 'src/environments/environment';
import { cities, proptype, states, userprofile } from '../Model/Api.model';
import { getalluser_model } from '../Model/get_all_users.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}


  baseurl:string= environment.apiUrl

  getuserdetail() {
    return this.http.get<userprofile[]>(this.baseurl+'/Users');
  }
  getuserlisting() {
    return this.http.get<All_properties[]>(
      this.baseurl+'/Property/GetuserPropertylisting'
    );
  }

  getotheruserlisting() {
    return this.http.get<any>(
      this.baseurl+'/Property/GetotheruserPropertylisting'
    );
  }

  get_allpropertylistings(){
    return this.http.get<All_properties[]>(this.baseurl+'/Property/all_properties');

  }

    get_allpropertylistings_admin(){
    return this.http.get<All_properties[]>(this.baseurl+'/Property/all_properties_admin');

  }




  //get cities

  getcities() {
    return this.http.get<cities[]>(
      this.baseurl+'/PropertyEssentials/getpropbycities'
    );
  }

   //get states

   getstates() {
    return this.http.get<states[]>(
      this.baseurl+'/PropertyEssentials/getpropbystate'
    );
  }






  //get proptype

  getproptype() {
    return this.http.get<proptype[]>(
      this.baseurl+'/PropertyEssentials/getproptype'
    );
  }





  //navbar BUY/Rent > on click  propertytype  .....data
  //city,ptype,pfor

  getprop_CTF(city: string, proptype: string, propfor: string) {
    return this.http.get<All_properties[]>(
      this.baseurl+'/Property/getprop_CTF?city=' +
        city +
        '&proptype=' +
        proptype +
        '&propfor=' +
        propfor
    );
  }




  //navbar BUY/Rent > on click  budget  .....data
  //   on click on buy/rent ->budget section    on navbar for budget

  getpropbudget_CFMinMax(
    city: string,
    propfor: string,
    min: number,
    max: number
  ) {
    return this.http.get<All_properties[]>(
      this.baseurl+'/Property/getpropbudget_CFMinMax?city=' +
        city +
        '&propfor=' +
        propfor +
        '&min=' +
        min +
        '&max=' +
        max
    );
    // https://localhost:7210/api/Property/getpropbudget_CFMinMax?city=Ahmedabad&propfor=sell&min=0&max=123456789
  }







  //homecomponent search api
  // https://localhost:7210/api/Property/allpropserch_CTFMinMax?city=Ahmedabad&proptype=flat&propfor=sell&min=0&max=123456789


  getpropserch_CTFMinMax(  city: string,proptype:string,
    propfor: string,
    min: number,
    max: number){

      return this.http.get<All_properties[]>( this.baseurl+'/Property/allpropserch_CTFMinMax?city='+city+'+&proptype='+proptype+'&propfor='+propfor+'&min='+min+'&max='+max)

  }






  //click on cities and get all properties in that city

  getprop_serchcity(city: string) {
    return this.http.get<All_properties[]>(
      this.baseurl+'/Property/allpropserch_city?city='+city);
  }


  //get prop_for data

  getprop_for(){
    return this.http.get<any>(this.baseurl+'/PropertyEssentials/Propfor')
}


  //get amenity data

  getprop_amenities(){
    return this.http.get<any>(this.baseurl+'/PropertyEssentials/PropAmenities')
}


  //get postedby data

  getprop_postedby(){
    return this.http.get<any>(this.baseurl+'/PropertyEssentials/postedby')
}


//get property on sell or rent

getprop_onRent() {
  return this.http.get<All_properties[]>(this.baseurl+'/Property/getpropertyon_rnt')}

  getprop_onSell() {
    return this.http.get<All_properties[]>(this.baseurl+'/Property/getpropertyon_sell')

  }


  //get prop by id

  getprop_byId(id:number){
    return this.http.
    get<All_properties[]>( this.baseurl+'/Property/getpropbyid?id='+id);
  }




////
////
////
////


  //post property



  ///Ownerdetails fill

  post_ownerdetails(formdata:any){
    return this.http.post(this.baseurl+'/Property/post_ownerdetails',formdata)

  }


  //Addressdetails fill

  post_Addressdetails(id:number,formdata:any){
    return this.http.post(this.baseurl+'/Property/post_Addressdetails?uid='+id,formdata)

  }

   //Propertydetails fill

   post_Propdetails(id:number,formdata:any){
    return this.http.post(this.baseurl+'/Property/post_Propdetails?uid='+id,formdata)

  }



   //post_PropAmenities fill

   post_PropAmenities(id:number,prop_id:number,formdata:any){
    return this.http.post(this.baseurl+'/Property/post_PropAmenities?uid='+id+'&prop_id='+prop_id,formdata)


  }



  //post image


   //post_PropAmenities fill

   post_PropImages(id:number,prop_id:number,formdata:any){
    return this.http.post(this.baseurl+'/Property/post_PropImages?uid='+id+'&prop_id='+prop_id,formdata)


  }

  postimage(file:any){
    debugger;
    return this.http.post(this.baseurl+'/Property/ImageUrl',file)
  }

  formfill(formdata:any){
    return this.http.post(this.baseurl+'/Property/register',formdata)
  }




  //edit property apis

  deleteProperty(pid:number){
    return this.http.put(this.baseurl+'/Property/deleteProperty?pid='+pid,null);
  }

  get_ownerdetails(uid:number,pid:number){
    return this.http.get(this.baseurl+'/Property/get_ownerdetails?uid='+uid+'&pid='+pid);
  }


  get_addressdetails(pid:number){
    return this.http.get(this.baseurl+'/Property/get_addressdetails?pid='+pid);
  }



  get_Propertydetails(pid:number){
    return this.http.get(this.baseurl+'/Property/get_Propertydetails?pid='+pid);
  }


  //edit property data apis...

  edit_ownerdetails(ownerdetails_Id:number,formdata:any){
    return this.http.put(this.baseurl+'/Property/edit_ownerdetails?ownerdetails_Id='+ownerdetails_Id,formdata);
  }


  edit_addressdetails(addressdetails_id:number,formdata:any){
    return this.http.put(this.baseurl+'/Property/edit_addressdetails?addressdetails_id='+addressdetails_id,formdata);
  }

  edit_Propertydetails(propertydetails_id:number,formdata:any){
    return this.http.put(this.baseurl+'/Property/edit_propertydetails?propertydetails_id='+propertydetails_id,formdata);
  }



  deelete_image(id:number){
    return this.http.delete(this.baseurl+'/Property/delete_propertyimage?image_id='+id);
  }


  otp(email:string){

    return this.http.post(this.baseurl+'/Users/sendotp2?email='+email,null)
  }


  //update useer profile
  updateUserProfileData(userprofile_id : number , formdata:any) {
    return this.http.put( this.baseurl+'/Users/edit_userprofile?userid='+userprofile_id,formdata)
}



  //update useer profile
  updateUserProfileData_admin(userprofile_id : number , formdata:any):Observable<getalluser_model> {
    return this.http.put<getalluser_model>( this.baseurl+'/Property/edit_userprofile?userid='+userprofile_id,formdata);
}





//////////
//////////
//////////
//////////
//forget pasword apis

otp_genrate(useremail:string){
  return this.http.post( this.baseurl+'/Users/sendotp?email='+useremail,null);
}

verify_otp(useremail:string,otp:number){
  return this.http.post( this.baseurl+'/Users/verifyOTP?email='+useremail+' &otp='+otp,null);
}

setnew_password(useremail:string,password:string){
  return this.http.put( this.baseurl+'/Users/updatePassword?email='+useremail+'&password='+password,null);

}







//get callback clcik


get_callback(uid:number,o_email:string,buyer_cno:number)
{
  return this.http.get( this.baseurl+'/Property/get_callback?uid='+uid+'&o_email='+o_email+'&buyer_c_no='+buyer_cno);
}



//get ownerdetails

get_contactdetails(buyer_email:string,buyer_name:string,buyer_cno:string,pid:number){

  return this.http.get( this.baseurl+'/Property/get_contactdetails?pid='+pid+'&buyer_email='+buyer_email+'&buyer_name='+buyer_name+'&buyer_c_no='+buyer_cno)
}


//getproperty_info_btn

getproperty_info_btn(uid:number,pid:number){
  return this.http.get( this.baseurl+'/Property/getProperty_Info?uid='+uid+'&pid='+pid)
}






//////////////
//////////////
//whishlist api
////////////////
////////////////


adding_in_whishlist(uid:number,pid:number){
  return this.http.post( this.baseurl+'/Users/add_whishlist?uid='+uid+'&pid='+pid,null)
}


//wislist property array
get_user_whishlist(uid:number){
  return this.http.get( this.baseurl+'/Users/get_user_whishlist?uid='+uid);
}


//wislist property data
get_user_whishlist_data(uid:number){
  return this.http.get<any[]>( this.baseurl+'/Users/get_user_whishlistdata?uid='+uid);
}



///
///
///
///
/// Admin Api's
///
///
///
///

//add amenity
Add_amenity(amenity:string){
  return this.http.post( this.baseurl+'/PropertyEssentials/addamenity?amenity='+amenity,null);
}


//add amenity
Add_city(stateid:number,city:string){
  return this.http.post( this.baseurl+'/PropertyEssentials/addcity?stateid='+stateid+'&city='+city,null);
}



//add state
Add_state(state:string){
  return this.http.post( this.baseurl+'/PropertyEssentials/addstate?state='+state,null);
}



//get all users

get_all_users():Observable<getalluser_model[]>{
  return this.http.get<getalluser_model[]>( this.baseurl+'/Users/get_all_users');
}

get_all_user(){
  return this.http.get<getalluser_model[]>( this.baseurl+'/Users/get_all_users');
}


//delete soft

deleteuser(uid:number){
  return this.http.put('https://localhost:7210/api/Users/userstatus?uid='+uid,null)
}



get_all_property():Observable<All_properties[]>{
  return this.http.get<All_properties[]>( this.baseurl+'/Property/all_properties');
}


//admin filter
// https://localhost:7210/api/Property/allpropserch_CTFBM?city=Ahmedabad&propfor=sell&propby=owner&proptype=flat&month=08&year=2023


allpropserch_CTFBM(city:string,propfor:string,propby:string,proptype:string,month:number,year:number){
  return this.http.get( this.baseurl+'/Property/allpropserch_CTFBM?city='+city+'&propfor='+propfor+'&propby='+propby+'&proptype='+proptype+'&month='+month+'&year='+year);
}

}



