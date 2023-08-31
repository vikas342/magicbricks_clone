import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { property_model } from 'src/app/Model/Api.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-whishlist',
  templateUrl: './user-whishlist.component.html',
  styleUrls: ['./user-whishlist.component.css'],
})
export class UserWhishlistComponent implements OnInit {
  whishlistdata: property_model[]=[];
  uid!: number;

  whislist_prop: number[] = [];

  //tochecheck user status
  userlogedin: boolean = this.serv.userlogedin;

  constructor(
    private data: DataService,
    private api: ApiService,
    private route: Router,
    private serv: AuthService
  ) {}

  ngOnInit(): void {
    this.uid = Number(localStorage.getItem('uid'));

    this.api.get_user_whishlist_data(this.uid).subscribe({
      next: (x) => {
        console.log('User WhisList', x);
        this.whishlistdata = this.data.dataparser2(x);
      },
      error: (e) => console.error('api errror'),
    });

    this.api.get_user_whishlist(this.uid).subscribe(
      (data: any) => {
        this.whislist_prop = data;
        console.warn(data);
      },
      (error) => {
        console.error('API call failed:', error);
      }
    );
  }

  propview(pid: number) {
    // console.log("object");
    // this.dataserv.setpid(pid);
    /// this.route.navigateByUrl('/propertyview');

    this.route.navigate(['/usermodule/propertyview', pid]);
  }

  putinwhishlist(pid: number) {
    //alert(pid)
    // if (this.arr.includes(pid)) {
    //   let x = this.arr.findIndex((x) => x == pid);
    //   this.arr.splice(x, 1);
    // } else {
    //   this.arr.push(pid);
    // }

    this.api.adding_in_whishlist(this.uid, pid).subscribe({
      next: (x) => {
        console.log(x);

        this.api.get_user_whishlist(this.uid).subscribe(
          (data: any) => {
            this.whislist_prop = data.da;
            console.warn(data);
          },
          (error) => {
            console.error('API call failed:', error);
          }
        );

        this.api.get_user_whishlist_data(this.uid).subscribe({
          next: (x) => {
            console.log('User WhisList', x);
            this.whishlistdata = x;
          },
          error: (e) => console.error('api errror'),
        });
      },
      error: (err) => {
        console.error('Error while adding to wish list' + err);
      },
    });
  }
}
