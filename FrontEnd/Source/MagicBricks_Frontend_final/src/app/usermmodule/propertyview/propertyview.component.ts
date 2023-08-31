import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-propertyview',
  templateUrl: './propertyview.component.html',
  styleUrls: ['./propertyview.component.css']
})
export class PropertyviewComponent implements OnInit {
  city!:string;
  pid!:number;

  getdeatils!:FormGroup;


  //tochecheck user status
  userlogedin: boolean = this.serv.userlogedin;

  prop_details!:any[];
  constructor(private dataserv:DataService,private api:ApiService,private fb:FormBuilder,private route:ActivatedRoute,private serv:AuthService){

  }



ngOnInit(): void {

  this.route.paramMap.subscribe(value =>{

    this.pid= Number(value.get('id'));
    console.log(this.pid)
   })

    //this.pid=this.dataserv.getpid();

    //alert(typeof(this.pid))

    this.api.getprop_byId(this.pid).subscribe((x)=>{
      this.prop_details=this.dataserv.dataparser2(x);
    })



    this.getdeatils=this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.email,Validators.required]],
      phone:['',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],

    })





}


getdetails_form(pid:number){
 // console.log(this.getdeatils.value)
  var data=this.getdeatils.value;
  var name=data.name
  var email=data.email
  var phone=data.phone

  //alert(name+ " "+email+" "+phone+" "+pid);
  this.api.get_contactdetails(email,name,phone,pid).subscribe({
    next: (x)=>{

      this.getdeatils.reset();
      alert("we sent owner details to your email");

    },
    error:()=> {
      alert("some error occured");

    },
  })
}



}
