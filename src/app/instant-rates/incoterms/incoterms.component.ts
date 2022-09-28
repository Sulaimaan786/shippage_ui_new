import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesService } from '../instant-rates.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { InstantRatesResultBean } from '../instant-rates-result-bean';
import { DataStorageService } from 'src/app/auth/data-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-incoterms',
  templateUrl: './incoterms.component.html',
  styleUrls: ['./incoterms.component.sass']
})
export class IncotermsComponent implements OnInit {
  incotermList=[];
  incotermsDetails=[];

 
  docForm: FormGroup;
  incotermsChange:boolean=false;
  commodityChange:boolean=false;
  cargoReadinessChange:boolean=false;
  calendar:boolean=true;
  loadTypeChange:boolean=false;
  cargoDetailsChange=false;
  loadTypeDetailBean:[];
  count:any;
  cardpadding:any;
  padleft:any;
  butTopmar:any;
  butLeftmar:any;
  height:any;
  firstbutton:any;
  topback:any;
  cardBottom:any;
  nextbutton:any;
  nxtbuttonright:any;
  nxtbuttonBot:any;
  buttonwidth:any;
  incotermsValue:any;

  constructor(private fb:FormBuilder,private route: ActivatedRoute,public dataStorage :DataStorageService,
    private router: Router,private httpService: HttpServiceService,
    
    private instantRatesService:InstantRatesService,
    private responsive: BreakpointObserver,
    private snackBar: MatSnackBar,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,) { 
    this.docForm = this.fb.group({
      control:[""],
      incoterm: ["", [Validators.required]],

      loadTypeDetailBean:this.fb.array([
        this.fb.group({
          equipmentType:[""],
          quantity:[""],
          cargoWeight:[""]
        })
      ]),

      cargoDetailBean:this.fb.array([
        this.fb.group({
          equipmentType:[""],
          quantity:[""],
          cargoWeight:[""]
        })
      ])
    })

    
   }

  ngOnInit(): void {


    this.httpService.get<InstantRatesResultBean>(this.instantRatesService.incoterms).subscribe(
      (data) => {
       
        this.incotermList = data.ltermslist;
      },
     
    );

    this.incotermsChange=true;
    
    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
          this.count = '1';
          this.cardpadding ='2px 8px 0px 8px';
          this.padleft = '55px';
          this.butTopmar = '20px';
          this.firstbutton = '20px'
          this.butLeftmar = '80px';
          this.height = '90%';
          this.cardBottom = '75px';
          this.nextbutton = '65px';
          this.nxtbuttonright = '28%';
          this.nxtbuttonBot = '3%';
          this.topback = true;
          this.buttonwidth = '160px';
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
          this.count = '2';
          this.cardpadding ='0px 50px 0px 20px';
          this.padleft = '80px';
          this.butTopmar = '20px';
          this.firstbutton = '150px'
          this.butLeftmar = '30px';
          this.height = '80%'
          this.cardBottom = '15px'
          this.nextbutton = '15px';
         this.nxtbuttonright = '2%';
         this.nxtbuttonBot = '1%';
          this.topback = false;
        }
      });

      this.incotermsValue =JSON.parse(this.dataStorage.getIncotermsDetails());    
      console.log("incoterms ==" +this.incotermsValue.incoterm);
      this.docForm.patchValue({
        'incoterm':  this.incotermsValue.incoterm,
       })

    }


  // incotermsSelect(){
  //   this.commodityChange=false;
  //   this.cargoReadinessChange=false;
  //   this.loadTypeChange=false;
  //   this.cargoDetailsChange=false;
  //   this.incotermsChange=true;
    
  // }
  // commoditySelect(){
  //   this.incotermsChange=false;
  //   this.cargoReadinessChange=false;
  //   this.loadTypeChange=false;
  //   this.cargoDetailsChange=false;
  //   this.commodityChange=true;
   
    
  // }

  // cargoReadinessSelect(){
  //   this.incotermsChange=false;
  //   this.commodityChange=false;
  //   this.loadTypeChange=false;
  //   this.cargoDetailsChange=false;
  //   this.cargoReadinessChange=true;

    
  // }
  // loadTypeSelect()
  // {
  //   this.incotermsChange=false;
  //   this.commodityChange=false;
  //   this.cargoReadinessChange=false;
  //   this.cargoDetailsChange=false;
  //   this.loadTypeChange=true;
  // }

  // cargoDetailsSelect()
  // {
  //   this.incotermsChange=false;
  //   this.commodityChange=false;
  //   this.cargoReadinessChange=false;
  //   this.loadTypeChange=false;
  //   this.cargoDetailsChange=true;
  // }

  radioClick(value:any){
    if(value==='Yes'){
    this.calendar=true;
    }
    
  }


  onItemChange(value){
    console.log(" Value is : ", value );
 }

 numberInput(evt, val) {
  console.log(evt, val);
}

addRow(){
  let loadTypeDetailBeanArray = this.docForm.controls.loadTypeDetailBean as FormArray;
  let arraylen = loadTypeDetailBeanArray.length;
  let newUsergroup: FormGroup = this.fb.group({
    equipmentType:[""],
    quantity:[""],
    cargoWeight:[""]
  })
  loadTypeDetailBeanArray.insert(arraylen,newUsergroup);
}

removeRow(index){
  let loadTypeDetailBeanArray = this.docForm.controls.loadTypeDetailBean as FormArray;
  loadTypeDetailBeanArray.removeAt(index);

}

addRow1(){
  let cargoDetailBeanArray = this.docForm.controls.cargoDetailBean as FormArray;
  let arraylen = cargoDetailBeanArray.length;
  let newUsergroup: FormGroup = this.fb.group({
    equipmentType:[""],
    quantity:[""],
    cargoWeight:[""]
  })
  cargoDetailBeanArray.insert(arraylen,newUsergroup);
}

removeRow1(index){
  let cargoDetailBeanArray = this.docForm.controls.cargoDetailBean as FormArray;
  cargoDetailBeanArray.removeAt(index);

}

incoterms(){
  this.router.navigate(["/instantRates/incoterms"]);
}


commodity(){
  
  if (this.docForm.valid) {
    this.router.navigate(["instantRates/commodity"]);
    this.incotermsDetails.push(this.docForm)
      this.dataStorage.setIncotermsDetails(JSON.stringify(this.docForm.value));
      console.log("Form Value", this.docForm.value);
  }
  else
  {
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
  this.router.navigate(["instantRates/cargoReadiness"]);
}

loadType(){
  this.router.navigate(["instantRates/loadType"]);
}
routeDetails(){
  this.router.navigate(["instantRates/route-details"]);
}
 

}
