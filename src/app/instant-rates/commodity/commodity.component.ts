import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesService } from '../instant-rates.service';
import { InstantRatesResultBean } from '../instant-rates-result-bean';
import { HttpErrorResponse } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DataStorageService } from 'src/app/auth/data-storage';
import { DOCUMENT } from "@angular/common";
import { Breakpoints } from "@angular/cdk/layout";

 

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
  cardpadding:any;
  padleft:any;
  butTopmar:any;
  butLeftmar:any;
  height:any;
  firstbutton:any;
  topback:any;
  nextbutton:any;
  nxtbuttonright:any;
  nxtbuttonBot:any;
  buttonwidth:any;

  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    public dataStorage :DataStorageService,private responsive: BreakpointObserver,
    private renderer: Renderer2,
    private router: Router,private httpService: HttpServiceService,
    private instantRatesService:InstantRatesService,@Inject(DOCUMENT) private document: Document,
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

   this.responsive.observe(Breakpoints.Handset)
   .subscribe(result => {

     if (result.matches) {  
       this.renderer.addClass(this.document.body,"content-block")
       this.cardpadding ='0px 20px 15px 20px';
       this.padleft = '55px';
       this.butTopmar = '20px';
       this.firstbutton = '20px'
       this.butLeftmar = '80px';
       this.height = '90%';
       this.nextbutton = '110px';
       this.nxtbuttonright = '28%';
       this.nxtbuttonBot = '3%';
       this.topback = true;
       this.buttonwidth = '160px';
     }else{ 
       this.renderer.removeClass(this.document.body,"content-block")
       this.cardpadding ='0px 50px 15px 20px';
       this.padleft = '80px';
       this.butTopmar = '20px';
       this.firstbutton = '150px';
       this.butLeftmar = '30px';
       this.height = '80%';
       this.nextbutton = '80px';
       this.nxtbuttonright = '2%';
       this.nxtbuttonBot = '1%';
       this.topback = false;
     }
   });
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
