import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { NotExpr } from '@angular/compiler';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent implements OnInit {


  loader:boolean=false;

  useremail!: string;

  //for forget password
  useremailform!: FormGroup;
  useremailform_visibility: boolean = true;

  //otp enter
  otpform!: FormGroup;
  otpform_visibility: boolean = false;

  //password enter
  passwordform!: FormGroup;
  passwordform_visibility: boolean = false;

  constructor(
    private fb: FormBuilder,
    private serv: AuthService,
    private route: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.useremailform = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
    });

    this.otpform = this.fb.group({
      otp: ['', [Validators.required, Validators.maxLength(4),Validators.pattern('^[0-9]{4,4}$')]],
    });

    this.passwordform = this.fb.group({
      password: ['', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-]).{8,}$')]],
      cpassword: ['', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-]).{8,}$')]],
    });
  }

  checkUser() {
    this.loader=true
    console.log(this.useremailform.value);
    this.useremail = this.useremailform.value.Email;
    // alert(this.useremail)
    this.api.otp_genrate(this.useremailform.value.Email).subscribe({
      next: (x) => {
        console.log(x);
        this.useremailform_visibility = false;
        this.otpform_visibility = true;
        this.loader=false
      },
      error: (err) => {
        //  alert(this.useremailform_visibility)
        alert("user doesn't exist");
        this.loader=false

      },
    });
  }

  checkotp() {
    console.log(this.otpform.value);
    this.loader=true

    // alert(this.otpform.value.otp);

    this.api.verify_otp(this.useremail, this.otpform.value.otp).subscribe({
      next: (x) => {
        this.passwordform_visibility = true;
        this.otpform_visibility = false;
        this.loader=false

        //alert('succes');
      },
      error: (err) => {
        alert('wrongn otp');
        this.loader=false

      },
    });

    // this.useremailform.reset();
    // this.otpform.reset();
  }

  setpassword() {
    // alert('password updated');
    // alert(this.passwordform.value.cpassword);
    // alert(this.passwordform.value.password);

    // console.log(this.passwordform.value);

    if(this.passwordform.value.password==this.passwordform.value.cpassword){
      this.loader=true


    this.api.setnew_password(this.useremail,this.passwordform.value.password).subscribe({
      next: (x) => {

        this.useremailform_visibility = true;

        this.otpform_visibility = false;
        this.passwordform_visibility = false;
      this.loader=false

        this.route.navigateByUrl('/login');
      },
      error: (err) => {

        alert("Error occured")
      this.loader=false


      },
    });


  }
  else{
    alert("Passwords do not match");
    this.loader=false

  }



  }


  get Email(){
    return this.useremailform.get("Email");
  }

  get otp(){
    return this.otpform.get("otp");
  }


  get password(){
    return this.passwordform.get("password");
  }
  get cpassword(){
    return this.passwordform.get("cpassword");
  }
}
