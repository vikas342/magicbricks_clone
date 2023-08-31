import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  propfor,
  proppostedby,
  proptype,
  property_model,
} from 'src/app/Model/Api.model';
import { cities } from 'src/app/Model/cities.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-resultpage',
  templateUrl: './resultpage.component.html',
  styleUrls: ['./resultpage.component.css'],
})
export class ResultpageComponent implements OnInit {



//loader
loader:boolean=false;




  //queryparams
  Qcity!: string;
  Qtype!: string;
  Qpropfor!: string;
  Qmin!: number;
  Qmax!: number;

  //
  uid!: number;
  pid!: number;

  //
  selectedcity: string = '';

  //filters

  city!: string;
  propfor!: string;
  proptype!: string;

  postedby!: string;
  min!: number;
  max!: number;

  //pagination
  p: number = 1;

  cities: cities[] = [];
  prop_type: proptype[] = [];
  prop_for: propfor[] = [];
  data: property_model[] = [];
  tempdata: any;
  prop_postedby: proppostedby[] = [];

  //tochecheck user status
  userlogedin: boolean = this.serv.userlogedin;

  /// request callback button
  req_callback!: FormGroup;

  //whislist array
  whislist_prop: number[] = [];

  constructor(
    private dataserv: DataService,
    private route: Router,
    private api: ApiService,
    private serv: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.uid = Number(localStorage.getItem('uid'));

    this.fetchdata();

    // this.data= this.dataserv.data;
    // console.warn(this.data);
    // this.x.push(this.data)

    this.api.get_user_whishlist(this.uid).subscribe(
      (data: any) => {
        this.whislist_prop = data;
        console.warn(data);
      },
      (error) => {
        console.error('API call failed:', error);
      }
    );

    this.req_callback = this.fb.group({
      contact_no: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')
        ],
      ],
    });

    this.api.getcities().subscribe((x) => {
      this.cities = x;
      console.log(this.cities);
    });

    // this.data = this.dataserv.getdata();

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

    // this.selectedcity=this.dataserv.getSelctedCity()
  }

  arr: number[] = [];

  fetchdata() {
    this.tempdata = null;
    this.router.queryParams.subscribe((params) => {
      this.Qcity = params['city'];
      this.Qtype = params['type'];
      this.Qmax = params['max'];
      this.Qmin = params['min'];
      this.Qpropfor = params['propfor'];
    });

    if (this.Qmax == undefined && this.Qmin == undefined && this.Qcity != undefined &&
      this.Qpropfor != undefined &&
      this.Qtype != undefined) {
      this.api
        .getprop_CTF(this.Qcity, this.Qtype, this.Qpropfor)
        .subscribe((x) => {
          //this.dataserv.putdata(this.serchdata);

          this.data = this.dataserv.dataparser(x);
        });
    }

    if (
      this.Qmax != undefined &&
      this.Qmin != undefined &&
      this.Qcity != undefined &&
      this.Qpropfor != undefined &&
      this.Qtype != undefined
    ) {
      this.api
        .getpropserch_CTFMinMax(
          this.Qcity,
          this.Qtype,
          this.Qpropfor,
          this.Qmin,
          this.Qmax
        )
        .subscribe((x) => {
          this.data = this.dataserv.dataparser(x);
        });
    }

    if (
      this.Qtype == undefined &&
      this.Qmax != undefined &&
      this.Qmin != undefined &&
      this.Qcity != undefined &&
      this.Qpropfor != undefined
    ) {
      this.api
        .getpropbudget_CFMinMax(this.Qcity, this.Qpropfor, this.Qmin, this.Qmax)
        .subscribe((x) => {
          // this.parsingdata(this.serchdata);

          //  this.dataserv.putdata(this.serchdata);
          this.data = this.dataserv.dataparser(x);
        });
    }
    if (
      this.Qmax == undefined &&
      this.Qmin == undefined &&
      this.Qpropfor == undefined &&
      this.Qtype == undefined &&
      this.Qcity != undefined
    ) {
      this.api.getprop_serchcity(this.Qcity).subscribe((x) => {


        console.log(this.Qmax+" "+this.Qmin+" "+this.Qpropfor+" "+this.Qtype+" "+this.Qcity+" ");
        // alert(this.Qcity)
        this.data = this.dataserv.dataparser(x);
      });
    }
  }

  resetallfilterdata() {
    this.fetchdata();

    const selectElement1 = document.querySelector(
      '#propfor'
    ) as HTMLSelectElement;
    selectElement1.value = '';

    const selectElement2 = document.querySelector(
      '#postedby'
    ) as HTMLSelectElement;
    selectElement2.value = '';

    const selectElement3 = document.querySelector(
      '#proptype'
    ) as HTMLSelectElement;
    selectElement3.value = '';
  }

  putinwhishlist(pid: number) {
    this.api.adding_in_whishlist(this.uid, pid).subscribe({
      next: (x) => {
        console.log(x);

        this.api.get_user_whishlist(this.uid).subscribe(
          (data: any) => {
            this.whislist_prop = data;
            console.warn(data);
          },
          (error) => {
            console.error('API call failed:', error);
          }
        );
      },
      error: (err) => {
        console.error('Error while adding to wish list' + err);
      },
    });
  }

  propview(pid: number) {
    // console.log("object");
    // this.dataserv.setpid(pid);
    /// this.route.navigateByUrl('/propertyview');

    this.route.navigate(['/usermodule/propertyview', pid]);
  }

  //willl used for setting city in below components
  //  selectcity(city: string) {
  //   this.selectedcity = city;
  //   alert(city + ' city is selcted');

  // }

  //get filter button
  getfilter() {
    //alert(this.city+" "+this.propfor+" " +this.proptype+" " +this.min +" "+this.max)

    this.dataserv.setcity(this.city);
    this.api
      .getpropserch_CTFMinMax(
        this.city,
        this.proptype,
        this.propfor,
        this.min,
        this.max
      )
      .subscribe((x) => {
        this.data = this.dataserv.dataparser(x);
      });
  }

  //select city from below navbar

  // selectcity_serch(x: any) {
  //   alert(x);

  //   this.api.getprop_serchcity(x).subscribe((x) => {
  //     this.data = this.dataserv.dataparser(x);

  //     console.warn(this.data);

  //     // this.tempdata = this.data;
  //   });

  //   this.selectedcity = x;
  // }

  selectpropfor_serch(x1: any) {
    // alert(x1.value);

    if (x1.value != '') {
      // this.data = this.tempdata;
      this.tempdata = this.data.filter((x: any) => x.propertyFor == x1.value);
    }
    if (x1.value == '') {
      this.fetchdata();
    }
  }

  selectproptype_serch(x: any) {
    // alert(x.value);
    if (x.value != '') {
      //  this.data = this.tempdata;

      this.tempdata = this.data.filter((z: any) => z.propertyType == x.value);
    }
    if (x.value == '') {
      this.fetchdata();
    }
  }

  selectPropPostedBy_serch(x: any) {
    //alert(x.value);

    if (x.value != '') {
      //this.data = this.tempdata;

      this.tempdata = this.data.filter((z: any) => z.postedBy == x.value);
    }
    if (x.value == '') {
      this.fetchdata();
    }
  }

  //onclick bufget button
  selectBudget_serch() {
    //  alert(this.min + ' ' + this.max);

    if (this.min != undefined && this.max != undefined) {
      // this.data = this.tempdata;

      this.tempdata = this.data.filter(
        (z: any) => z.price >= this.min && z.price <= this.max
      );
    }
  }

  //sorting

  sorting(x: any) {
    // alert(x.value);
    if (x.value == 'lth') {
      this.data = this.data.sort((a: any, b: any) => a.price - b.price);
    }
    if (x.value == 'htl') {
      this.data = this.data.sort((a: any, b: any) => b.price - a.price);
    }
  }

  req_callback_submit(oemail: string) {
    console.log(this.req_callback.value.contact_no, oemail, this.uid);
    this.loader=true

    this.api
      .get_callback(this.uid, oemail, this.req_callback.value.contact_no)
      .subscribe({
        next: (res) => {
    this.loader=false

          alert('We have sent your contact details to seller');
          this.req_callback.reset();
        },
        error: (err) => {
          alert('try it latter');
        },
      });
  }

  get_propinfo_btn(pid: number) {
    this.loader=true
    if (this.userlogedin) {
      this.pid = pid;

      this.api.getproperty_info_btn(this.uid, pid).subscribe({
        next: (x) => {
    this.loader=false

          alert('we have sent property details on your Email');
        },
        error: (err) => {
          console.error('Error', err);
        },
      });
    } else {
      this.route.navigateByUrl('/login');
    }
  }

  parseInt(value: string): number {
    return parseInt(value);
  }

  get contact_no() {
    return this.req_callback.get('contact_no');
  }
}
