import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private serv: AuthService,
    private route: Router
  ) {}
  sigin_form!: FormGroup;
  loader:boolean=false;

  data: any;

  ngOnInit(): void {
    this.sigin_form = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-]).{8,}$')]],
    });
  }



  onsubmit() {
    this.loader=true;
    console.log(this.sigin_form.value);
    this.data = this.sigin_form.value;

    this.serv.logindata(this.data).subscribe({
      next: (x) => {
        console.log(x);
        this.serv.storetoken(x);
    this.loader=false;


        if (this.serv.role == 'Admin') {
          this.route.navigateByUrl('/adminmodule/adminhome');

        } else if (this.serv.role == 'User') {
          this.route.navigateByUrl('/usermodule/home');
        }
      },
      error: (error) => {

        console.log(error);
        alert('Invalid credetials');
        this.loader=false;
      },
    });
  }



  get Email(){
    return this.sigin_form.get("Email");
  }

  get Password(){
    return this.sigin_form.get("Password");
  }
}
