import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  userlogedin: boolean = this.checkuserstatus();
  userid!: number;
  role!: string;

  // baseurl:string= environment.apiUrl
  baseurl:string= environment.apiUrl




  postdata(formdata: any) {
    return this.http.post( this.baseurl+'/Auth/register', formdata);
  }

  logindata(formdata: any) {
    return this.http.post( this.baseurl+'/Auth/login', formdata);
  }

  storetoken(tokenValue: any) {
    this.userlogedin = true;
    let data = tokenValue.token;
    this.role = tokenValue.role;
    this.userid = tokenValue.uid;
    localStorage.setItem('token', data);
    localStorage.setItem('role',this.role)
    localStorage.setItem('uid', this.userid.toString());
  }
  gettoken() {
    return localStorage.getItem('token');
  }
  getuid() {
    return localStorage.getItem('uid');
  }

  checkuserstatus() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  logout() {
    this.userlogedin = false;

    localStorage.clear();
    this.router.navigateByUrl('');
  }

  // postdata(formdata:any){
  //   this.http.post( this.baseurl+'/Auth/register',formdata).subscribe(x=>{
  //     console.log(x);
  //   },
  //   (error)=>{console.log(error)}
  //   )
  // };


  adminguard(){

    if(this.userlogedin==true && localStorage.getItem('role')=='Admin' ){
      return true ;
    }
    else{
      return false;
    }

  }

  usergaurd(){
    if(this.userlogedin==true && localStorage.getItem('role')=='User'){
      return true ;
    }
    else{
      return false;
    }

  }
}
