import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { property_model } from 'src/app/Model/Api.model';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recomdations',
  templateUrl: './recomdations.component.html',
  styleUrls: ['./recomdations.component.css']
})
export class RecomdationsComponent  {


  receivedData!: string;

  recomdations:property_model[]=[]

  data:any;


    constructor(private dataserv: DataService,private api:ApiService,private route: Router,) {
    this.dataserv.dataEvent.subscribe((data) => {
      this.receivedData = data;
      this.api.getprop_serchcity(this.receivedData).subscribe((x)=>{
        this.recomdations=dataserv.dataparser(x)
        this.recomdations=this.recomdations.slice(0,4)

        console.log(this.recomdations);
      })
    });


  }


  propview(pid: number) {

    this.route.navigate(['/usermodule/propertyview', pid]);
  }


}
