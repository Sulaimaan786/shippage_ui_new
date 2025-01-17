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
import { MatSnackBar } from '@angular/material/snack-bar';
import { LandscapeLoaderComponent } from '../landscape-loader/landscape-loader.component';
import { MatDialog } from '@angular/material/dialog';
 

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.sass']
})
export class CommodityComponent implements OnInit {

  commodityL:[];
  dropdownList = [];
  selectedItems = [];
  // dropdownSettings:IDropdownSettings;
  

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
  cardBottom:any;
  commodityValues:any;
  Others:boolean=false;
  count:any;
  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    public dataStorage :DataStorageService,private responsive: BreakpointObserver,
    private renderer: Renderer2,public dialog:MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,private httpService: HttpServiceService,
    private instantRatesService:InstantRatesService,@Inject(DOCUMENT) private document: Document,
    ) {
    // control:[""];
    // commodity:["",[Validators.required]];
   }

  ngOnInit(): void {
  
    this.docForm = this.fb.group({
      // control:[""],
      commodity:[""]
         
    })
     
    this.incotermsChange=true;
  //   this.dropdownSettings = {
  //     singleSelection: false,
  //     idField: 'commodityId', 
  //     textField: 'text',
  //    selectAllText: 'Select All',
  //    unSelectAllText: 'UnSelect All',
  //    itemsShowLimit: 3,      
  //    allowSearchFilter: true
  //  };

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
       this.nextbutton = '80px';
       this.nxtbuttonright = '28%';
       this.nxtbuttonBot = '3%';
       this.topback = true;
       this.buttonwidth = '160px';
       this.cardBottom = '65px'
       this.count = '1';
     }else{ 
       this.renderer.removeClass(this.document.body,"content-block")
       this.cardpadding ='0px 50px 15px 20px';
       this.padleft = '80px';
       this.butTopmar = '20px';
       this.firstbutton = '150px';
       this.butLeftmar = '30px';
       this.height = '80%';
       this.nextbutton = '55px';
       this.nxtbuttonright = '2%';
       this.nxtbuttonBot = '1%';
       this.topback = false;
       this.cardBottom = '0px';
       this.count = '2';
     }
   });

   // tablet view
   this.responsive.observe([Breakpoints.Tablet]).subscribe(result =>{
    if (result.matches) { 
    const viewport = screen.orientation.type;
     if(viewport == "portrait-primary"){
      this.tabview()
      } 
    }
  });

   this.commodityValues =JSON.parse(this.dataStorage.getCommodityDetails());
   

      if(this.commodityValues == null){
        this.commodityList();
      }else{
        this.commodityList();
        this.docForm.patchValue({
          'commodity':  this.commodityValues.commodity,
        })
      }



  }


  //multi select list
  commodityList(){
    this.httpService.get<InstantRatesResultBean>(this.instantRatesService.commoditylist).subscribe( 
      (data) => { 
        this.dropdownList =data.commodityl;
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
  


  
incoterms(){
  
  if (this.docForm.valid) {
    this.router.navigate(["/instantRates/incoterms"]);
    // this.commodityDetails.push(this.docForm.value)
    this.dataStorage.setCommodityDetails(JSON.stringify(this.docForm.value));
    console.log("Form Value", this.docForm.value);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
  
}

commodity(){
  
  if (this.docForm.valid) {
    this.router.navigate(["instantRates/commodity"]);
    this.commodityDetails.push(this.docForm.value)
    this.dataStorage.setCommodityDetails(JSON.stringify(this.docForm.value));
    console.log("Form Value", this.docForm.value);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
}

showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}


cargoReadiness(){
  
  if (this.docForm.valid) {
  this.router.navigate(["instantRates/cargoReadiness"]);
  // this.commodityDetails.push(this.docForm.value)
  this.dataStorage.setCommodityDetails(JSON.stringify(this.docForm.value));
  console.log("Form Value", this.docForm.value);
  }
  else{
    this.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
  }
  
}

loadType(){
  
  if (this.docForm.valid) {
    this.router.navigate(["instantRates/loadType"]);
    // this.commodityDetails.push(this.docForm.value)
    this.dataStorage.setCommodityDetails(JSON.stringify(this.docForm.value));
    console.log("Form Value", this.docForm.value);
    }
    else{
      this.showNotification(
        "snackbar-danger",
        "Please fill all the required details!",
        "top",
        "right");
    }
}

radioClick(value:any){
  if(value=='Yes'){
  this.Others=true;
  }
  else if(value==='No')
  {
    this.Others=false; 
  }
  
}

// onItemSelect(roles: any) {
//   console.log(roles);
// }
// onSelectAll(roles: any) {
//   console.log(roles);
// }


tabview(){ 
  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";  
  }
  const dialogRef = this.dialog.open(LandscapeLoaderComponent, {
    height: "100%",
    width: "100%",
     direction: tempDirection,
  });  
}
}
