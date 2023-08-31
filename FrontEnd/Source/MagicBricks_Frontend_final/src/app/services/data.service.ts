import { EventEmitter, Injectable } from '@angular/core';
import { All_properties, property_model } from '../Model/Api.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  pid!: number;

  selctedcity: string = '';

  data!: any[];

  editPropid!: number;


  dataEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  putdata(data: any) {
    this.data = data;
    // console.log("Data is "+this.data);
    console.warn(data);
    this.parsingdata(data);
    localStorage.setItem('searcheddata', JSON.stringify(data));
  }

  getdata() {
    const data = localStorage.getItem('searcheddata');
    return data ? JSON.parse(data) : null;

    // return this.data;
  }

  setpid(id: number) {
    this.pid = id;
    localStorage.setItem('pid', id.toString());
    console.log(this.pid);
  }

  //for pasing json data
  parsingdata(data: any) {
    for (let i of this.data) {
      if (i.imageUrl) {
        let x = JSON.parse(i.imageUrl);

        i.imageUrl = x;
      }
      if (i.prop_amenities) {
        let x = JSON.parse(i.prop_amenities);

        i.prop_amenities = x;
      }
    }
  }

  dataparser(data1: All_properties[]):any {
    let data3 = data1.filter(
      (x) => x.u_Id != Number(localStorage.getItem('uid'))
     );


    for (let i of data3) {
      if (i.imageUrl) {
        let x = JSON.parse(i.imageUrl);

        i.imageUrl = x;
      }
      if (i.prop_amenities) {
        let x = JSON.parse(i.prop_amenities);

        i.prop_amenities = x;
      }
    }

    return data3;
  }

  dataparser2(data1: All_properties[]):any{
    console.warn(data1);

    for (let i of data1) {
      if (i.imageUrl) {
        let x = JSON.parse(i.imageUrl);

        i.imageUrl = x;
      }
      if (i.prop_amenities) {
        let x = JSON.parse(i.prop_amenities);

        i.prop_amenities = x;
      }
    }

    return data1;
  }

  getpid() {
    const pidValue = localStorage.getItem('pid');
    return pidValue !== null ? parseInt(pidValue) : 0;
  }

  setcity(x: string) {
    this.selctedcity = x;
    localStorage.setItem('selctedCity', x);
  }
  getSelctedCity() {
    return localStorage.getItem('selctedCity');
  }
}
