import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesService } from '../instant-rates.service';
import { InstantRatesResultBean } from '../instant-rates-result-bean';
import { HttpErrorResponse } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DataStorageService } from 'src/app/auth/data-storage';
import { DOCUMENT } from "@angular/common";


@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.sass']
})
export class CommodityComponent implements OnInit {

  commodityL:[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;

  docForm: FormGroup;
  incotermsChange:boolean=false;
  commodityChange:boolean=false;
  cargoReadinessChange:boolean=false;
  calendar:boolean=true;
  loadTypeChange:boolean=false;
  cargoDetailsChange=false;
  loadTypeDetailBean:[];
  commodityDetails:any;

  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    public dataStorage :DataStorageService,
    private router: Router,private httpService: HttpServiceService,
    private instantRatesService:InstantRatesService
    ) {
    control:[""];
    commodity:[""];
   }

  ngOnInit(): void {
  
    this.docForm = this.fb.group({
      control:[""],
      commodity:[""]
         
    })
    //multi select list
    this.httpService.get<InstantRatesResultBean>(this.instantRatesService.commoditylist).subscribe(
      
      
      (data) => {
    //    this.roleList = data.roleList;
        this.dropdownList =data.commodityl;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );

  

    this.incotermsChange=true;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'commodityId', 
      textField: 'text',
     selectAllText: 'Select All',
     unSelectAllText: 'UnSelect All',
     itemsShowLimit: 3,      
     allowSearchFilter: true
   };


  }

  
incoterms(){
  this.router.navigate(["/instantRates/incoterms"]);
}

commodity(){
  this.router.navigate(["instantRates/commodity"]);
}




cargoReadiness(){
  this.router.navigate(["instantRates/cargoReadiness"]);
  // this.commodityDetails.push(this.docForm.value)
  this.dataStorage.setCommodityDetails(JSON.stringify(this.docForm.value));
  console.log("Form Value", this.docForm.value);
}

loadType(){
  this.router.navigate(["instantRates/loadType"]);
}

onItemSelect(roles: any) {
  console.log(roles);
}
onSelectAll(roles: any) {
  console.log(roles);
}
}
