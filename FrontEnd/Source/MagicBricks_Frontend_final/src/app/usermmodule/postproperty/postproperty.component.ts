import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { cities, propfor, proptype, states } from 'src/app/Model/Api.model';
import { imagedata } from 'src/app/Model/prop_images';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-postproperty',
  templateUrl: './postproperty.component.html',
  styleUrls: ['./postproperty.component.css'],
})
export class PostpropertyComponent implements OnInit {
  prop_id!: number;

  add_id!: number;
  owner_id!: number;

  uid!: number;
  ownerdetails!: FormGroup;
  adressdetails!: FormGroup;
  propertydetails!: FormGroup;
  propImages!: FormGroup;
  amenitydetails!: FormGroup;

  ownerdetails_visiblity: boolean = true;
  adressdetails_visiblity: boolean = false;
  propertydetails_visiblity: boolean = false;
  propImages_visiblity: boolean = false;
  amenitydetails_visiblity: boolean = false;

  //api data

  cities!: cities[];
  state!: states[];
  propfor!: propfor[];
  proptype!: proptype[];
  postedby!: any[];
  amenities_arr: any[] = [];

  //
  //
  //
  //

  //posting porerty things

  owner_detail_Id!: any;
  Address_detail_Id!: any;
  Property_detail_Id!: any;

  //image upload

  imgFile!: File;
  url: any;
  imagedata: any[] = [];

  images_object = {
    images: this.imagedata,
  };

  //
  //
  //
  //
  //
  //
  //

  constructor(
    private dataserv: DataService,
    private api: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.api.getcities().subscribe((x) => {
      this.cities = x;
      console.log(this.cities);
    });

    this.api.getstates().subscribe((x) => {
      this.state = x;
      console.log(this.state);
    });

    this.api.getprop_for().subscribe((x) => {
      this.propfor = x;
    });

    this.api.getprop_postedby().subscribe((x) => {
      this.postedby = x;
    });

    this.api.getproptype().subscribe((x) => {
      this.proptype = x;
    });

    this.api.getprop_amenities().subscribe((x) => {
      // console.log(x);
      this.amenities_arr = x;
      // console.warn(this.amenities_arr);
      this.pushamnities();
    });

    this.uid = Number(localStorage.getItem('uid'));
    // alert(typeof(this.uid))

    this.ownerdetails = this.fb.group({
      Owner_Id: [this.uid],
      Owner_Name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)?$')],
      ],
      contact_no: ['', [Validators.required,Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]],
      Email: ['', [Validators.required, Validators.email]],
    });

    this.adressdetails = this.fb.group({
      Building_Name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)?$')],
      ],
      Area: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      State: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6,6}$')]],
    });

    this.propertydetails = this.fb.group({
      Owner_details: [''],
      Address: [''],
      PostedBy: ['', [Validators.required]],
      Prop_for: ['', [Validators.required]],
      Prop_Type: ['', [Validators.required]],

      Price: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      Prop_desc: ['', [Validators.required]],

      Status: [14],

      // amenities: this.fb.array([]),
    });

    this.amenitydetails = this.fb.group({
      amenities: this.fb.array([]),
    });

    this.propImages = this.fb.group({
      images: this.fb.array([
        this.fb.group({
          imageurl: ['', [Validators.required]],
        }),
      ]),
    });
  }

  get getamenities() {
    return this.amenitydetails.controls['amenities'] as FormArray;
  }

  get getImages() {
    return this.propImages.controls['images'] as FormArray;
  }

  addmoreImages() {
    const imges = this.fb.group({
      imageurl: ['', [Validators.required]],
    });

    this.getImages.push(imges);
  }

  pushamnities() {
    for (const i of this.amenities_arr) {
      const amenity_form = this.fb.group({
        id: [i.id],
        amenity: [i.amenity],
        exist: [false, [Validators.required]],
      });

      this.getamenities.push(amenity_form);
    }
  }

  ownerdetails_Submit() {
    console.log(this.ownerdetails.value);

    this.api.post_ownerdetails(this.ownerdetails.value).subscribe((x) => {
      this.owner_detail_Id = x;

      console.log(this.owner_detail_Id);
      console.log(typeof this.owner_detail_Id);
      this.ownerdetails_visiblity = false;
      this.adressdetails_visiblity = true;
      this.ownerdetails.reset();

      this.propertydetails.patchValue({ Owner_details: this.owner_detail_Id });
    });
  }

  adressdetails_Submit() {
    console.log(this.adressdetails.value);

    this.api
      .post_Addressdetails(this.uid, this.adressdetails.value)
      .subscribe((x) => {
        this.Address_detail_Id = x;
        console.log(this.Address_detail_Id);
        this.adressdetails_visiblity = false;
        this.propertydetails_visiblity = true;
        this.adressdetails.reset();

        this.propertydetails.patchValue({ Address: this.Address_detail_Id });
      });
  }

  propertydetails_Submit() {
    console.log(this.propertydetails.value);

    // this.api.post_Propdetails(this.uid,this.Address_detail_Id,this.owner_detail_Id ,this.propertydetails.value).subscribe((x)=>{
    this.api
      .post_Propdetails(this.uid, this.propertydetails.value)
      .subscribe((x) => {
        this.propertydetails.reset();

        this.Property_detail_Id = x;
        console.log(this.Property_detail_Id);
        this.propertydetails_visiblity = false;
        this.amenitydetails_visiblity = true;
      });
  }

  amenitydetails_Submit() {
    console.log(this.amenitydetails.value);
    this.api
      .post_PropAmenities(
        this.uid,
        this.Property_detail_Id,
        this.amenitydetails.value
      )
      .subscribe((x) => {
        this.amenitydetails.reset();

        console.log('Amenity posted');
        this.amenitydetails_visiblity = false;
        this.propImages_visiblity = true;
      });
  }

  // propImages_Submit(){

  //   console.log(this.propImages.value);

  // }

  submitted() {
    // alert('property listed sucessfully');

    console.log(this.propImages.value);

    this.api
      .post_PropImages(this.uid, this.Property_detail_Id, this.images_object)
      .subscribe((x) => {
        console.log('property listed');
        this.imagedata.splice(0, this.imagedata.length);
        this.propImages.reset();

        this.ownerdetails_visiblity = true;
        this.adressdetails_visiblity = false;
        this.propertydetails_visiblity = false;
        this.propImages_visiblity = false;
        this.amenitydetails_visiblity = false;

        alert("property posted successfully")
      });
  }

  //image upload

  fileadd(event: any, i: number) {
    //console.log(event.target.files);

    this.imgFile = event.target.files[0];

    console.log(this.imgFile.name);
    if (
      this.imgFile.name.includes('.png') ||
      this.imgFile.name.includes('.jpg') ||
      this.imgFile.name.includes('.jpeg') ||
      this.imgFile.name.includes('.gif')
    ) {
      const form = new FormData();
      form.append('file', this.imgFile as File);
      console.log(form);

      this.api.postimage(form).subscribe((res) => {
        // this.url=res;
        // console.log(this.url.url);
        // console.log(res);
        if(this.imagedata[i]!=null){
          this.imagedata.splice(i,1);
        }

         this.imagedata.push(res);

        console.warn(this.images_object);
      });
    } else {
      alert('upload image only');
      this.getImages.reset();
       }
  }

  //validdation getter

  //ownerdetailform

  get Owner_Name() {
    return this.ownerdetails.get('Owner_Name');
  }

  get contact_no() {
    return this.ownerdetails.get('contact_no');
  }
  get Email() {
    return this.ownerdetails.get('Email');
  }

  //address detail
  get Building_Name() {
    return this.adressdetails.get('Building_Name');
  }
  get Area() {
    return this.adressdetails.get('Area');
  }
  get State() {
    return this.adressdetails.get('State');
  }
  get City() {
    return this.adressdetails.get('City');
  }
  get Pincode() {
    return this.adressdetails.get('Pincode');
  }

  // propdetails

  get PostedBy() {
    return this.propertydetails.get('PostedBy');
  }
  get Prop_for() {
    return this.propertydetails.get('Prop_for');
  }
  get Prop_Type() {
    return this.propertydetails.get('Prop_Type');
  }
  get Price() {
    return this.propertydetails.get('Price');
  }
  get Prop_desc() {
    return this.propertydetails.get('Prop_desc');
  }
}
