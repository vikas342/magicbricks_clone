import { Component } from '@angular/core';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  num!:number;

  constructor(private fb:FormBuilder,private serv:AuthService,private route:Router,private api:ApiService){

  }
  signup_form!:FormGroup;
  myobj!:Array<object>;
data:any;



  ngOnInit(): void {

    this.signup_form=this.fb.group({


      Name:['',[Validators.required,Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)?$')]],

      Email:['',[Validators.required,Validators.email]],
      Password: ['', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-]).{8,}$')]],

    })
  }


  onsubmit(){

    this.api.otp(this.signup_form.value.Email).subscribe((x)=>{
      console.log(x);

    })

  }


  get Name(){
    return this.signup_form.get("Name");
  }

  get Email(){
    return this.signup_form.get("Email");
  }

  get Password(){
    return this.signup_form.get("Password");
  }


  submit(x:any){
    //alert(x)
    this.data=this.signup_form.value;

    console.log(this.data);

    this.serv.postdata(this.data)
    .subscribe((data:any)=>{
      console.log(data);


    },
    (error)=>{console.log(error)}
    )
    this.route.navigateByUrl('\login');
  }
}
