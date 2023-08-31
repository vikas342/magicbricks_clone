import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { property_model, userprofile } from 'src/app/Model/Api.model';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private apiServ: ApiService,
    private dataserv: DataService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  uid!: number;
  userdetails!: userprofile[];
  userlistings: property_model[] = [];
  updatprofileForm!: FormGroup;
  ngOnInit() {
    this.uid = Number(localStorage.getItem('uid'));

    this.updatprofileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
    });

    this.apiServ.getuserdetail().subscribe((res) => {
      this.userdetails = res;
      console.log(res);
      this.updatprofileForm.patchValue({
        name: this.userdetails[0].name,
        email: this.userdetails[0].email,
      });
    });

    this.apiServ.getuserlisting().subscribe((res) => {
      this.userlistings = this.dataserv.dataparser2(res);
    });
  }

  propview(pid: number) {
    // console.log("object");
    // this.dataserv.setpid(pid);
    this.route.navigate(['/usermodule/propertyview', pid]);
  }

  deleteListing(pid: number) {
    this.apiServ.deleteProperty(pid).subscribe((x) => {
      alert('property deleted sucessfully');

      this.apiServ.getuserlisting().subscribe((res) => {
        this.userlistings = this.dataserv.dataparser2(res);
      });
    });
  }

  editListing(pid: number) {
    // this.dataserv.editPropid=pid;
    // localStorage.setItem('editPropId',pid.toString())
    // localStorage.setItem('pid',pid.toString())
    //this.route.navigateByUrl('/editproperty')
    this.route.navigate(['/usermodule/editproperty', pid]);
  }

  submitupdatprofileForm() {
    console.log(this.updatprofileForm.value);

    this.apiServ
      .updateUserProfileData(this.uid, this.updatprofileForm.value)
      .subscribe({
        next:(x)=>{

            this.apiServ.getuserdetail().subscribe((res) => {
              this.userdetails = res;
            });

        },
        error(err) {
            alert("Email alredy exist");
        },
      })
  }

  updateprofile() {
    this.updatprofileForm.patchValue({
      name: this.userdetails[0].name,
      email: this.userdetails[0].email,
    });
  }



  get name(){
    return this.updatprofileForm.get("name");
  }

  get email(){
    return this.updatprofileForm.get("email");
  }
}
