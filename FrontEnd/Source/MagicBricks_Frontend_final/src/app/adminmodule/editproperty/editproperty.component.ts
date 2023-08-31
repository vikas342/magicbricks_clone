import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-editproperty',
  templateUrl: './editproperty.component.html',
  styleUrls: ['./editproperty.component.css'],
})
export class EditpropertyComponent implements OnInit {
  //db id
  ownerdetails_id: any;
  addressdetails_id: any;
  propertydetails_id: any;

  //api data
  owner_details: any;
  address_details: any;
  property_details: any;
  prop_details: any;
  pid!: number;
  uid!: number;

  amenities_arr: any[] = [];
  cities!: any[];
  state!: any[];
  propfor!: any[];
  proptype!: any[];
  postedby!: any[];

  //forms

  propImages!: FormGroup;
  ownerdetailsforms!: FormGroup;
  propertydetailsforms!: FormGroup;
  adressdetailsforms!: FormGroup;
  amenitydetailsforms!: FormGroup;

  //image upload

  imgFile!: File;
  url: any;
  imagedata: any[] = [];

  images_object = {
    images: this.imagedata,
  };

  constructor(
    private api: ApiService,
    private dataserv: DataService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    // this.route.paramMap.subscribe((value) => {
    //   this.pid = Number(value.get('id'));
    //   this.propertydetails_id = Number(value.get('id'));

    //   console.log(this.pid);
    // });

    this.route.queryParams.subscribe((params) => {
      this.pid = params['pid'];
      this.uid = params['uid'];
    });

    this.api.getprop_byId(this.pid).subscribe((x) => {
      this.prop_details = this.dataserv.dataparser2(x);
      console.log(this.prop_details);
    });

    this.ownerdetailsforms = this.fb.group({
      Owner_Id: [this.uid],
      Owner_Name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)?$')],
      ],
      contact_no: ['', [Validators.required,Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]],
      Email: ['', [Validators.required, Validators.email]],
    });

    this.adressdetailsforms = this.fb.group({
      Building_Name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)?$')],
      ],
      Area: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      State: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Pincode: [
        '',
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern('^[0-9]{6,6}$'),
        ],
      ],
    });

    this.propertydetailsforms = this.fb.group({
      Owner_details: [''],
      Address: [''],
      PostedBy: ['', [Validators.required]],
      Prop_for: ['', [Validators.required]],
      Prop_Type: ['', [Validators.required]],
 
      Price: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      Prop_desc: ['', [Validators.required]],

      Status: [14],
    });

    this.amenitydetailsforms = this.fb.group({
      amenities: this.fb.array([]),
    });

    this.propImages = this.fb.group({
      images: this.fb.array([
        // this.fb.group({
        //   imageurl:['',[Validators.required]]
        // })
      ]),
    });
  }

  ngOnInit() {
    this.api.get_ownerdetails(this.uid, this.pid).subscribe((x) => {
      this.owner_details = x;
      // this.ownerdetails_id=this.owner_details[0].ownwerDetails_id
      this.ownerdetails_id = this.owner_details.ownwerDetails_id;

      // owner_details : { "propId": 13, "ownwerDetails_id": 7, "ownerName": "john wick", "contactNo": "741852963", "email": "jackson@gmail.com" }

      this.ownerdetailsforms.patchValue({
        Owner_Name: this.owner_details.ownerName,
        contact_no: this.owner_details.contactNo,
        Email: this.owner_details.email,
      });
    });

    this.api.getprop_amenities().subscribe((x) => {
      // console.log(x);
      this.amenities_arr = x;
      // console.warn(this.amenities_arr);
      this.pushamnities();
    });

    this.api.get_addressdetails(this.pid).subscribe((x) => {
      // console.log(x)

      this.address_details = x;
      // this.addressdetails_id=this.address_details[0].addressDetails_Id

      // address_details : { "propertyDetails_Id": 13, "addressDetails_Id": 5, "buildingName": "vandematram fabulo", "area": "gota", "state": 5, "city": 5, "pincode": "380015" }

      this.addressdetails_id = this.address_details.addressDetails_Id;
      this.adressdetailsforms.patchValue({
        Building_Name: this.address_details.buildingName,
        Area: this.address_details.area,
        State: this.address_details.state,
        City: this.address_details.city,
        Pincode: this.address_details.pincode,
      });
    });

    this.api.get_Propertydetails(this.pid).subscribe((x) => {
      this.property_details = x;
      // this.propertydetails_id = this.property_details[0].propDetails_id;

      //  property_details : { "propDetails_id": 13, "ownerDetails": 7, "address": 5, "postedBy": 16, "propFor": 4, "propType": 2, "price": 880000000, "prop_desc": "asdhj" }

      this.propertydetails_id = this.property_details.propDetails_id;

      this.propertydetailsforms.patchValue({
        Owner_details: this.property_details.ownerDetails,
        Address: this.property_details.address,
        PostedBy: this.property_details.postedBy,
        Prop_for: this.property_details.propFor,
        Prop_Type: this.property_details.propType,

        Price: this.property_details.price,
        Prop_desc: this.property_details.prop_desc,
      });
    });

    this.api.getcities().subscribe((x) => {
      this.cities = x;
    });

    this.api.getstates().subscribe((x) => {
      this.state = x;
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
  }

  //get image array controller
  get getImages() {
    return this.propImages.controls['images'] as FormArray;
  }

  //add images

  addmoreImages() {
    const imges = this.fb.group({
      imageurl: ['', [Validators.required]],
    });

    this.getImages.push(imges);
  }

  get getamenities() {
    return this.amenitydetailsforms.controls['amenities'] as FormArray;
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

  ownerdetailsforms_submit() {
    // alert()
    console.log(this.ownerdetailsforms.value);
    this.api
      .edit_ownerdetails(this.ownerdetails_id, this.ownerdetailsforms.value)
      .subscribe((x) => {
        console.warn(x);

        this.api.getprop_byId(this.pid).subscribe((x) => {
          this.prop_details = this.dataserv.dataparser2(x);
          console.log(this.prop_details);
        });
      });
  }

  adressdetailsforms_submit() {
    console.log(this.adressdetailsforms.value);

    this.api
      .edit_addressdetails(
        this.addressdetails_id,
        this.adressdetailsforms.value
      )
      .subscribe((x) => {
        console.warn(x);

        this.api.getprop_byId(this.pid).subscribe((x) => {
          this.prop_details = this.dataserv.dataparser2(x);
          console.log(this.prop_details);
        });
      });
  }

  amenitydetailsforms_submit() {
    console.log(this.amenitydetailsforms.value);
    // this.amenitydetailsforms.reset();

    this.api.getprop_amenities().subscribe((x) => {
      // console.log(x);
      this.amenities_arr = x;
      // console.warn(this.amenities_arr);
      this.pushamnities();
      this.api
        .post_PropAmenities(
          this.uid,
          this.propertydetails_id,
          this.amenitydetailsforms.value
        )
        .subscribe((x) => {
          console.log(x);
          this.api.getprop_byId(this.pid).subscribe((x) => {
            this.prop_details = this.dataserv.dataparser2(x);
            console.log(this.prop_details);
          });
        });
    });
  }

  propertydetailsforms_submit() {
    console.log(this.propertydetailsforms.value);

    this.api
      .edit_Propertydetails(
        this.propertydetails_id,
        this.propertydetailsforms.value
      )
      .subscribe((x) => {
        console.log(x);

        this.api.getprop_byId(this.pid).subscribe((x) => {
          this.prop_details = this.dataserv.dataparser2(x);
          console.log(this.prop_details);
        });
      });
  }

  ownerdetailsModalform() {
    this.api.get_ownerdetails(this.uid, this.pid).subscribe((x) => {
      this.owner_details = x;
      // this.ownerdetails_id=this.owner_details[0].ownwerDetails_id
      this.ownerdetails_id = this.owner_details.ownwerDetails_id;

      // owner_details : { "propId": 13, "ownwerDetails_id": 7, "ownerName": "john wick", "contactNo": "741852963", "email": "jackson@gmail.com" }

      this.ownerdetailsforms.patchValue({
        Owner_Name: this.owner_details.ownerName,
        contact_no: this.owner_details.contactNo,
        Email: this.owner_details.email,
      });
    });
  }

  AddressdetailsModalform() {
    this.api.get_addressdetails(this.pid).subscribe((x) => {
      // console.log(x)

      this.address_details = x;
      // this.addressdetails_id=this.address_details[0].addressDetails_Id

      // address_details : { "propertyDetails_Id": 13, "addressDetails_Id": 5, "buildingName": "vandematram fabulo", "area": "gota", "state": 5, "city": 5, "pincode": "380015" }

      this.addressdetails_id = this.address_details.addressDetails_Id;
      this.adressdetailsforms.patchValue({
        Building_Name: this.address_details.buildingName,
        Area: this.address_details.area,
        State: this.address_details.state,
        City: this.address_details.city,
        Pincode: this.address_details.pincode,
      });
    });
  }
  propertydetailsModalform() {
    this.api.get_Propertydetails(this.pid).subscribe((x) => {
      this.property_details = x;
      console.warn(this.property_details);
      // this.propertydetails_id = this.property_details[0].propDetails_id;

      //  property_details : { "propDetails_id": 13, "ownerDetails": 7, "address": 5, "postedBy": 16, "propFor": 4, "propType": 2, "price": 880000000, "prop_desc": "asdhj" }

      this.propertydetails_id = this.property_details.propDetails_id;

      this.propertydetailsforms.patchValue({
        Owner_details: this.property_details.ownerDetails,
        Address: this.property_details.address,
        PostedBy: this.property_details.postedBy,
        Prop_for: this.property_details.propFor,
        Prop_Type: this.property_details.propType,

        Price: this.property_details.price,
        Prop_desc: this.property_details.prop_desc,
      });
    });
  }

  deleteimage(id: number) {
    //alert(id);
    this.api.deelete_image(id).subscribe(
      (x) => {
        console.log(x + ' delted');
        this.api.getprop_byId(this.pid).subscribe((x) => {
          this.prop_details = this.dataserv.dataparser2(x);
          console.log(this.prop_details);
        });
      },
      (error) => {
        alert('Property should have atleast 1 image');
      }
    );
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

      // this.api.postimage(form).subscribe((res) => {
      //   // this.url=res;
      //   // console.log(this.url.url);
      //   // console.log(res);
      //   this.imagedata.push(res);

      //   console.warn(this.images_object);
      // });

      this.api.postimage(form).subscribe((res) => {
        // this.url=res;
        // console.log(this.url.url);
        // console.log(res);
        if (this.imagedata[i] != null) {
          this.imagedata.splice(i, 1);
        }

        this.imagedata.push(res);

        console.warn(this.images_object);
      });
    } else {
      alert('upload image only');
      this.getImages.reset();
    }
  }

  propImagesforms_submit() {
    //  alert('property listed sucessfully');

    //console.log(this.propImages.value);
    console.log(this.images_object);

    this.api
      .post_PropImages(this.uid, this.propertydetails_id, this.images_object)
      .subscribe((x) => {
        console.log('property listed');
        this.getImages.clear();
        this.propImages.reset();
        this.api.getprop_byId(this.pid).subscribe((x) => {
          this.prop_details = this.dataserv.dataparser2(x);
          console.log(this.prop_details);
        });
      });
  }

  //validdation getter

  //ownerdetailform

  get Owner_Name() {
    return this.ownerdetailsforms.get('Owner_Name');
  }

  get contact_no() {
    return this.ownerdetailsforms.get('contact_no');
  }
  get Email() {
    return this.ownerdetailsforms.get('Email');
  }

  //address detail
  get Building_Name() {
    return this.adressdetailsforms.get('Building_Name');
  }
  get Area() {
    return this.adressdetailsforms.get('Area');
  }
  get State() {
    return this.adressdetailsforms.get('State');
  }
  get City() {
    return this.adressdetailsforms.get('City');
  }
  get Pincode() {
    return this.adressdetailsforms.get('Pincode');
  }

  // propdetails

  get PostedBy() {
    return this.propertydetailsforms.get('PostedBy');
  }
  get Prop_for() {
    return this.propertydetailsforms.get('Prop_for');
  }
  get Prop_Type() {
    return this.propertydetailsforms.get('Prop_Type');
  }
  get Price() {
    return this.propertydetailsforms.get('Price');
  }
  get Prop_desc() {
    return this.propertydetailsforms.get('Prop_desc');
  }
}
