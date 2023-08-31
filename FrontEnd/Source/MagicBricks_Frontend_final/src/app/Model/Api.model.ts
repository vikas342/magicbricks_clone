//essential things

export interface states {
  id: number;
  state: string;
}

export interface proptype {
  id: number;
  type: string;
}

export interface proppostedby {
  id: number;
  postedby: string;
}

export interface prop_amenities {
  id: number;
  amenity: string;
}

export interface propfor {
  id: number;
  propfor: string;
}


export interface cities{
  id: number
   city: string
    stateid: number
}


//user profile
export interface userprofile{
  u_id: number,
   name: string,
   email: string

}




//main
export interface property_model{
  u_Id: number,
  prop_Id: number,
  prop_desc:string,
  owner_Name:string,
  o_email:string,
  o_contact: string,
  building_Name:string,
  area:string,
  pincode:string,
  state:string,
  city:string,
  postedBy:string,
  propertyFor:string,
  propertyType:string,
  status:string,
  price:number,
  createdDate:string,

  prop_amenities:amenities[],
imageUrl:images[],
}




export interface amenities{
  amenity:string
}

export interface images{
  Img_Id:number
  Image_url:string
}





export interface All_properties {
  u_Id: number;
  prop_Id: number;
  prop_desc: string;
  owner_Name: string;
  o_email: string;
  o_contact: string;
  building_Name: string;
  area: string;
  pincode: string;
  state: string;
  city: string;
  postedBy: string;
  propertyFor: string;
  propertyType: string;
  status: string;
  price: number;
  createdDate: string;
  prop_amenities: string;
  imageUrl: string;
}
