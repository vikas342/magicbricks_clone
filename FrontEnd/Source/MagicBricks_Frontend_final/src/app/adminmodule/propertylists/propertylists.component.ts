import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getalluser_model } from 'src/app/Model/get_all_users.model';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { selectpropertydata } from 'src/app/state/propterty_store/selector';
import { Router } from '@angular/router';
import { cities } from 'src/app/Model/cities.model';
import { propfor } from 'src/app/Model/propfor.model';
import { proppostedby } from 'src/app/Model/proppostedby.model';
import { proptype } from 'src/app/Model/proptype.model';
import { All_properties, property_model } from 'src/app/Model/Api.model';

@Component({
  selector: 'app-propertylists',
  templateUrl: './propertylists.component.html',
  styleUrls: ['./propertylists.component.css'],
})
export class PropertylistsComponent implements OnInit {


  p:number=1

  //filters
  cities: cities[] = [];
  prop_type: proptype[] = [];
  prop_for: propfor[] = [];
  prop_postedby: proppostedby[] = [];

  userlistings: property_model[] = [];
  userlisting_len!: number;

  currentDate: string;

  filterform!: FormGroup;

  //filters

  city!: string;
  propfor!: string;
  proptype!: string;
  postedby!: string;
  monthyear!: string;

  constructor(
    private api: ApiService,
    private store: Store,
    private fb: FormBuilder,
    private dataserv: DataService,
    private route: Router
  ) {
    this.currentDate = new Date().toISOString().split('T')[0].substring(0, 7);
  }

  tempdata: any = null;
  ngOnInit(): void {
    this.api.get_allpropertylistings_admin().subscribe((x) => {
      this.userlistings = this.dataserv.dataparser2(x);
      localStorage.setItem(
        'totalpropListing',
        this.userlistings.length.toString()
      );
    });

    this.api.getcities().subscribe((x) => {
      this.cities = x;
      console.log(this.cities);
    });

    this.api.getproptype().subscribe((x) => {
      this.prop_type = x;
      console.log(this.prop_type);
    });

    this.api.getprop_for().subscribe((x) => {
      this.prop_for = x;
      console.log(this.prop_for);
    });

    this.api.getprop_postedby().subscribe((x) => {
      this.prop_postedby = x;
      console.log(this.prop_postedby);
    });

    this.filterform = this.fb.group({
      city: ['', Validators.required],
      propfor: ['', Validators.required],
      proptype: ['', Validators.required],
      postedby: ['', Validators.required],
      monthyear: ['', Validators.required],
    });
  }

  deleteListing(pid: number) {
    //alert(pid);
    this.api.deleteProperty(pid).subscribe((x) => {
      //alert('property deleted sucessfully');

      this.api.get_allpropertylistings_admin().subscribe((res) => {
        this.userlistings = this.dataserv.dataparser2(res);
      });
    });
  }

  editListing(pid: number, uid: number) {
    // alert(pid+" "+uid);

    const queryParams = {
      pid: pid,
      uid: uid,
    };
    this.route.navigate(['/adminmodule/adminhome/editproperty'], {
      queryParams: queryParams,
    });

    // this.route.navigate(['/adminmodule/adminhome/editproperty',pid]);
  }

  apicall() {
    this.api.get_allpropertylistings_admin().subscribe((x) => {
      this.userlistings = this.dataserv.dataparser2(x);
    });
  }

  cityname!: string;
  selectpropcity_serch(event: any) {
    //alert(event.value);
    var x = this.tempdata;
    this.cityname = event.value;
    if (event.value != '') {
      this.tempdata = this.userlistings.filter((x) => x.city == event.value);
    }
    if (event.value == '') {
      this.tempdata = x;
    }
  }

  selectmonth_serch(event: any) {
    // alert(event.value);

    if (this.city == null) {
      this.tempdata = this.userlistings.filter(
        (x: any) => x.createdDate.substring(0, 7) == event.value
      );
    }

    if (this.city != null) {
      this.tempdata = this.userlistings.filter(
        (x) =>
          x.createdDate.substring(0, 7) == event.value && x.city == this.city
      );
    }
  }

  resetallfilterdata() {
    this.api.get_allpropertylistings_admin().subscribe((x) => {
      this.userlistings = this.dataserv.dataparser2(x);
    });

    const selectElement3 = document.querySelector('#date') as HTMLSelectElement;
    selectElement3.value = '';

    const selectElement4 = document.querySelector('#city') as HTMLSelectElement;
    selectElement4.value = '';
    this.tempdata = null;
  }

  getfilter() {
    // {city: '', propfor: '', proptype: '', postedby: '', monthyear: ''}
    console.log(this.filterform.value);
    let month = this.filterform.value.monthyear.substring(5, 7);
    let year = this.filterform.value.monthyear.substring(0, 4);

    this.api
      .allpropserch_CTFBM(
        this.filterform.value.city,
        this.filterform.value.propfor,
        this.filterform.value.postedby,
        this.filterform.value.proptype,
        month,
        year
      )
      .subscribe((x: any) => {
        this.tempdata = this.dataserv.dataparser2(x);
      });
  }
}
