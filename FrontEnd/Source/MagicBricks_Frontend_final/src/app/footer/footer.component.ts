import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  cities!:any[];


  constructor(private api: ApiService,private route:Router){}

  ngOnInit(): void {

    this.api.getcities().subscribe((x)=>{
      this.cities=x;
    })

  }


  propertyof(city:string){

    const queryParams = {
      city: city

    };

    this.route.navigate(['/usermodule/serchresult'], { queryParams: queryParams });
  }

}
