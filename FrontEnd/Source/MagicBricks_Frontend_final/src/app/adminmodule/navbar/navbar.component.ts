import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent
implements OnInit {

  constructor(
    private serv: AuthService,
    // private route: Router,
    private api: ApiService,
    private dataserv: DataService
  ) {}


  //tochecheck user status
  userlogedin: boolean = this.serv.userlogedin;


  logout() {
    this.serv.logout();
  }


  ngOnInit(): void {


  }

}
