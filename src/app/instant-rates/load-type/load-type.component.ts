import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataStorageService } from 'src/app/auth/data-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstantRatesService } from '../instant-rates.service';
import { InstantRatesResultBean } from '../instant-rates-result-bean';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { LandscapeLoaderComponent } from '../landscape-loader/landscape-loader.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-load-type',
  templateUrl: './load-type.component.html',
  styleUrls: ['./load-type.component.scss']
})
export class LoadTypeComponent implements OnInit {
  
  docForm: FormGroup;
  loadTypeDetailBean = [];
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
  cardBottom:any
  equipmentTypeList = [];
  loadtype: any;
  loadDetails: any;
  equipmentType: any;
  eqtypeId: any;
  commodityDetails:any;
  resetMargin:any;
  resetFloat:any;
  freightMode:any;
  
  loadTypeMenu:boolean=false;
  cargoTypeMenu:boolean=false;
 
  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    private router: Router,private responsive: BreakpointObserver,private httpService: HttpServiceService,
    private snackBar:MatSnackBar,private instantRatesService : InstantRatesService,
    private renderer: Renderer2,public dataStorage :DataStorageService,
    @Inject(DOCUMENT) private document: Document,public dialog : MatDialog) { 
    this.docForm = this.fb.group({
      // control:[""],
      

      loadTypeDetailBean:this.fb.array([
        this.fb.group({
          equipmentType:["", [Validators.required]],
          quantity:["", [Validators.required]],
          cargoWeight:["", [Validators.required]],
          value:[""],
          tariffid:[""]
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

    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {
        
        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
          this.cardpadding ='2px 8px 0px 8px';
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
          this.cardBottom = '65px';
          this.resetMargin='100px';
          this.resetFloat='right';
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
          this.cardpadding ='0px 50px 0px 20px';
          this.padleft = '80px';
          this.butTopmar = '20px';
          this.firstbutton = '150px'
          this.butLeftmar = '30px';
          this.height = '80%'
          this.nextbutton = '70px';
          this.buttonwidth = '120px';
         this.nxtbuttonright = '2%';
         this.nxtbuttonBot = '1%';
          this.topback = false;
          this.cardBottom = '0px'
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



    
      this.freightMode = JSON.parse(this.dataStorage.getWelcomeDetails());
      console.log(this.freightMode);

      this.loadCargoType();

      //Load type
     this.loadtype = this.dataStorage.getLoadDetails();
     this.loadDetails = JSON.parse(this.loadtype)


     if(this.loadDetails == null){
      this.listfunc();
    }else{
      this.listfunc();
      let salesOrderDtlArray = this.docForm.controls.loadTypeDetailBean as FormArray;
      salesOrderDtlArray.removeAt(0);
      this.loadTypeDetailBean = this.loadDetails.loadTypeDetailBean;
      this.loadTypeDetailBean.forEach(element => {
        let salesOrderDtlArray = this.docForm.controls.loadTypeDetailBean as FormArray;
        let arraylen = salesOrderDtlArray.length;
        let newUsergroup: FormGroup = this.fb.group({
       
         equipmentType: [element.equipmentType],
         quantity: [element.quantity],
         cargoWeight: [element.cargoWeight]
 
        })
        salesOrderDtlArray.insert(arraylen, newUsergroup);
 
      });
    }
 
    
  }
listfunc(){
  this.httpService.get<InstantRatesResultBean>(this.instantRatesService.equipmentTypeList).subscribe(
    (data) => {
     
      this.equipmentTypeList = data.lInstantRatesBean;
    },

 );
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
    cargoWeight:[""],
    value:[""],
    tariffid:[""]
  })
  loadTypeDetailBeanArray.insert(arraylen,newUsergroup);
}

removeRow(index){
  let loadTypeDetailBeanArray = this.docForm.controls.loadTypeDetailBean as FormArray;
  loadTypeDetailBeanArray.removeAt(index);

}
 

  
incoterms(){
  
  if (this.docForm.valid) {
    this.router.navigate(["/instantRates/incoterms"]);
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


cargoReadiness(){
  
  if (this.docForm.valid) {
    this.router.navigate(["instantRates/cargoReadiness"]);
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
showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}

  rates(){
    
  if (this.docForm.valid) {
    this.router.navigate(["instantRates/rates"]);
    this.dataStorage.setLoadDetails(JSON.stringify(this.docForm.value));
    console.log(this.docForm.value);
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
  loadCargoType(){
    if(this.freightMode==='Sea'){
        this.cargoTypeMenu=false;
        this.loadTypeMenu=true; 
    
    }
    else if(this.freightMode==='Air')
    { 
      this.loadTypeMenu=false;
      this.cargoTypeMenu=true;
      
    }
    
  }
  reset()
  {
    this.docForm = this.fb.group({
      control:[""],

      loadTypeDetailBean:this.fb.array([
        this.fb.group({
          equipmentType:[""],
          quantity:[""],
          cargoWeight:[""]
        })
      ]),
    })
  }


  
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
