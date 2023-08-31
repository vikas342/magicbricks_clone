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

// "prop_amenities": [ { "amenity": "Swimming pool" }, { "amenity": "Gym" } ], "imageUrl": [ { "Img_Id": 32, "Image_url": "https://myimages.vikas.s3.ap-south-1.amazonaws.com/Images/screenshot_20230215_165432.png" }, { "Img_Id": 33, "Image_url": "https://myimages.vikas.s3.ap-south-1.amazonaws.com/Images/screenshot_20230220_115157.png" } ]
