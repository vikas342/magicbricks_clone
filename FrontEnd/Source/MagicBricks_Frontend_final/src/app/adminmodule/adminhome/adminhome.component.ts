import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Store } from '@ngrx/store';
 import { getalluser_model } from 'src/app/Model/get_all_users.model';
 import { selectusersdata, userlength } from 'src/app/state/user_store/selctor';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { propertylength } from 'src/app/state/propterty_store/selector';
import { GetAllproperty } from 'src/app/state/propterty_store/action';
import { GetAlluser } from 'src/app/state/user_store/action';
import { cities, states } from 'src/app/Model/cities.model';
import { prop_amenities } from 'src/app/Model/proppostedby.model';
import { property_model } from 'src/app/Model/Api.model';
@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent  implements OnInit{




  addcity!:FormGroup;
  addstate!:FormGroup;
  u_length!:number;
  prop_length!:number;

  addamenity!:FormGroup;
  userdata: any;
  cities:cities[]=[]
  dbstates!:states[];
  amenities!:prop_amenities[];

  userlistings: property_model[] = [];
  statesOfIndia:string[] = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];


  constructor(private api:ApiService,private dataserv:DataService,private fb:FormBuilder,private store:Store){


    this.api.get_allpropertylistings_admin().subscribe((x) => {
      this.userlistings = this.dataserv.dataparser2(x);

      localStorage.setItem('totalpropListing',this.userlistings.length.toString());
    this.prop_length=Number(localStorage.getItem('totalpropListing'));


    });
    this.api.get_all_user().subscribe((x) => {
      this.userdata = x;
      localStorage.setItem('totalusers',this.userdata.length.toString());
      this.u_length=Number(localStorage.getItem('totalusers'));

    });




  }
  ngOnInit(): void {


    this.api.get_allpropertylistings_admin().subscribe((x) => {
      this.userlistings = this.dataserv.dataparser2(x);

      localStorage.setItem('totalpropListing',this.userlistings.length.toString());

    });
    this.api.get_all_user().subscribe((x) => {
      this.userdata = x;
      localStorage.setItem('totalusers',this.userdata.length.toString());

    });

    this.prop_length=Number(localStorage.getItem('totalpropListing'));
    this.u_length=Number(localStorage.getItem('totalusers'));

    //  this.store.dispatch(GetAlluser());
    //  this.store.dispatch(GetAllproperty());




    this.api.getprop_amenities().subscribe((x)=>{

      this.amenities=x;
    })

    this.api.getcities().subscribe((x) => {
      this.cities = x;
    });
    this.api.getstates().subscribe((x)=>{
      this.dbstates=x;
    })
    this.addcity=this.fb.group({
      state:['',[Validators.required]],
      city:['',[Validators.required]]
    });

    this.addstate=this.fb.group({
      state:['',[Validators.required]]
    });

    this.addamenity=this.fb.group({
      amenity:['',[Validators.required]]
    });


  }


  addamenity_func(){
   // alert(this.addamenity.value.amenity)
    this.api.Add_amenity(this.addamenity.value.amenity).subscribe({

      next: (x)=> {
      //  alert("amenity posted");
      this.api.getprop_amenities().subscribe((x)=>{

        this.amenities=x;
      })

        this.addamenity.reset();

      },
      error:(err)=>{
          alert(err.error);
      },

    })


  }
  addcity_func(){
    //alert(this.addcity.value.state+" "+this.addcity.value.city)

    this.api.Add_city(this.addcity.value.state,this.addcity.value.city).subscribe({
      next:(x)=> {
       // alert("city posted");
       this.api.getcities().subscribe((x) => {
        this.cities = x;
      });
        this.addcity.reset();


      },
      error:(err)=>{
        alert(err.error);
      }
    })
    this.addcity.reset();
  }
  addstate_func(){
   // alert(this.addstate.value.state)
    this.api.Add_state(this.addstate.value.state).subscribe({
      next:(x)=> {
      //  alert("state posted");
      this.api.getstates().subscribe((x)=>{
        this.dbstates=x;
      })
        this.addstate.reset();
      },
      error:(err)=>{
        alert(err.error);
      }
    })
   }

}
