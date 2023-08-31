import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { Renderer2, ViewChild } from '@angular/core';
import { property_model } from '../Model/property.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() hideSomeProperties: boolean = false;
  @ViewChild('offcanvasElement') offcanvasElement: any;

  constructor(
    private serv: AuthService,
    private route: Router,
    private api: ApiService,
    private dataserv: DataService
  ) {}

  //data of serch

  recomdationdata: property_model[] = [];
  serchdata!: any[];

  cities: any[] = [];
  types: any[] = [];

  //tochecheck user status
  userlogedin: boolean = this.serv.userlogedin;

  selectedcity: any;

  //for buy or sell
  selctedpropFor: string = '';

  logout() {
    this.serv.logout();
  }

  //willl used for setting city in below components
  selectcity(city: string) {
    this.selectedcity = city; 

    this.dataserv.setcity(city);
    const eventData = city;
    this.dataserv.dataEvent.emit(eventData); // Emit
  }

  ngOnInit(): void {
    //get city

    this.api.getcities().subscribe((x) => {
      this.cities = x;
      console.log(this.cities);
      this.dataserv.dataEvent.emit('Ahmedabad'); // Emit
    });

    this.api.getproptype().subscribe((x) => {
      this.types = x;
      console.log(this.types);
    });

    localStorage.setItem('selctedCity', 'Ahmedabad');
    this.selectedcity = localStorage.getItem('selctedCity');
  }

  //willl be call in service and service will call api in api crete dto for type and city on basis fetch data
  propserch(city: string, proptype: string) {
    // alert(city + ' ' + proptype + ' ' + this.selctedpropFor);
    // this.api.getprop_CTF(city, proptype, this.selctedpropFor).subscribe((x) => {
    //   this.serchdata = x;
    //   // console.log(this.serchdata);
    //  // this.parsingdata(this.serchdata);

    //   this.dataserv.putdata(this.serchdata);

    //   this.route.navigateByUrl('/serchresult');

    // });

    const queryParams = {
      city: city,
      type: proptype,
      propfor: this.selctedpropFor,
    };
    this.route.navigate(['/usermodule/serchresult'], {
      queryParams: queryParams,
    });
  }

  propbudget(min: number, max: number) {
    // alert(
    //   this.selectedcity + ' ' + this.selctedpropFor + ' ' + min + ' ' + max
    // );

    // this.api.getpropbudget_CFMinMax(this.selectedcity, this.selctedpropFor, min, max)
    //   .subscribe((x) => {
    //     // console.warn(x);

    //     this.serchdata = x;
    //     // this.parsingdata(this.serchdata);

    //     this.dataserv.putdata(this.serchdata);

    //     this.route.navigateByUrl('/serchresult');
    //   });

    // this.route.navigateByUrl('/serchresult');
    const queryParams = {
      city: this.selectedcity,

      propfor: this.selctedpropFor,
      min: min,
      max: max,
    };
    this.route.navigate(['/usermodule/serchresult'], {
      queryParams: queryParams,
    });
  }

  postproperty() {
    if (this.userlogedin) {
      this.route.navigateByUrl('/usermodule/postproperty');
    } else {
      this.route.navigateByUrl('/login');
    }
  }

  whishlist() {
    if (this.userlogedin) {
      this.route.navigateByUrl('/usermodule/whishlist');
    } else {
      this.route.navigateByUrl('/login');
    }
  }

  profile() {
    if (this.userlogedin) {
      this.route.navigateByUrl('/usermodule/profile');
    } else {
      this.route.navigateByUrl('/login');
    }
  }
}
