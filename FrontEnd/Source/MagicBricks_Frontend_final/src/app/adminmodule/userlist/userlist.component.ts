import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getalluser_model } from 'src/app/Model/get_all_users.model';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Updateprofile } from 'src/app/state/user_store/action';
import { selectusersdata } from 'src/app/state/user_store/selctor';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  userid!: number;
  userdata: getalluser_model[] = [];
  p:number=1

  constructor(
    private api: ApiService,
    private store: Store,
    private fb: FormBuilder,
    private dataserv: DataService
  ) {
    //this.store.dispatch(GetAlluser())
  }

  ngOnInit(): void {
    // this.userdata=this.store.select(selectusersdata);
    this.api.get_all_user().subscribe((x) => {
      this.userdata = x;
      localStorage.setItem('totalusers', this.userdata.length.toString());
    });
    console.log(this.userdata);
  }

  userstatus(uid: number) {
    //alert(uid);
    this.api.deleteuser(uid).subscribe((x) => {
      console.log(x);
      this.api.get_all_user().subscribe((x) => {
        this.userdata = x;
      });
    });
  }
}
