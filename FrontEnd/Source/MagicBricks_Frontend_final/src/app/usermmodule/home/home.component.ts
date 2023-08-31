import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { cities, proptype } from 'src/app/Model/Api.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  serchform!: FormGroup;
  userlogedin: boolean = this.auth.userlogedin;

  //serch

  // city: any = 'Ahmedabad';
  // type: string = 'Flat';
  // min: number = 0;
  // max: number = 5000000;

  propfor: string = 'Sell';

  //serch

  otheruserlistings!: any[];
  data: any = [];

  cities: cities[] = [];
  types: proptype[] = [];

  constructor(
    private fb: FormBuilder,
    private apiserv: ApiService,
    private route: Router,
    private dataservice: DataService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.serchform = this.fb.group({
      city: ['Ahmedabad', [Validators.required]],
      type: ['Flat', [Validators.required]],
      min: [0, [Validators.required,Validators.pattern('^[0-9]*$')]],
      max: [5000000, [Validators.required,Validators.pattern('^[0-9]*$')]],
    });

    // if (this.auth.userlogedin) {
    //   this.apiserv.getotheruserlisting().subscribe((res) => {
    //     this.otheruserlistings = res;

    //     for (let i of this.otheruserlistings) {
    //       if (i.imageUrl) {
    //         let x = JSON.parse(i.imageUrl);

    //         i.imageUrl = x;
    //       }
    //       if (i.prop_amenities) {
    //         let x = JSON.parse(i.prop_amenities);

    //         i.prop_amenities = x;
    //       }
    //     }
    //   });
    // } else {
    //   this.apiserv.get_allpropertylistings().subscribe((res) => {
    //     this.otheruserlistings = res;

    //     for (let i of this.otheruserlistings) {
    //       if (i.imageUrl) {
    //         let x = JSON.parse(i.imageUrl);

    //         i.imageUrl = x;
    //       }
    //       if (i.prop_amenities) {
    //         let x = JSON.parse(i.prop_amenities);

    //         i.prop_amenities = x;
    //       }
    //     }
    //   });
    // }


    this.apiserv.getcities().subscribe((x) => {
      this.cities = x;
    });


    this.apiserv.getproptype().subscribe((x) => {
      this.types = x;
      console.log(x);
    });
  }

  parseInt(value: string): number {
    return parseInt(value);
  }

  serch() {
    if (this.serchform.value.min > this.serchform.value.max) {
      alert('Min price should be lesser than Max price');
    } else if (this.serchform.value.max <= this.serchform.value.min) {
      alert('Max price should be grater than Min price');
    } else {
      this.dataservice.setcity(this.serchform.value.city);

      const queryParams = {
        city: this.serchform.value.city,
        type: this.serchform.value.type,
        propfor: this.propfor,
        min: this.serchform.value.min,
        max: this.serchform.value.max,
      };
      this.route.navigate(['/usermodule/serchresult'], {
        queryParams: queryParams,
      });
    }
  }

  setpropfor(x: string) {
    this.propfor = x;
    if (x == 'Rent') {
      this.serchform.patchValue({
        max: 25000,
      });
    }
    if (x == 'Buy') {
      this.serchform.patchValue({
        max: 5000000,
      });
    }
  }

  postproperty() {
    if (this.userlogedin) {
      this.route.navigateByUrl('/usermodule/postproperty');
    } else {
      this.route.navigateByUrl('/login');
    }
  }


  get min() {
    return this.serchform.get('min');
  }
  get max() {
    return this.serchform.get('max');
  }
}
