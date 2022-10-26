import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, Renderer2,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/auth/data-storage';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesService } from '../instant-rates.service';
import { DOCUMENT } from "@angular/common";
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { InstantRatesResultBean } from '../instant-rates-result-bean';
@Component({
  selector: 'app-cargo-details',
  templateUrl: './cargo-details.component.html',
  styleUrls: ['./cargo-details.component.scss']
})
export class CargoDetailsComponent implements OnInit {

  docForm: FormGroup;
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
  sea: boolean;
  unit: [""];
  length:any;
  width:any;
  toggleMargin:any;
  freightMode:any;
  
  loadTypeMenu:boolean=false;
  cargoTypeMenu:boolean=false;
  
  

  constructor(private fb:FormBuilder,private route: ActivatedRoute,public dataStorage :DataStorageService,
    private router: Router,private httpService: HttpServiceService,
    
    private instantRatesService:InstantRatesService,
    private responsive: BreakpointObserver,
    private snackBar: MatSnackBar,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {
    this.docForm = this.fb.group({
      // control:[""],
      // incoterm: ["", [Validators.required]],

      

      cargoDetailBean:this.fb.array([
        this.fb.group({
          equipmentType:[""],
          quantity:[""],
          cargoWeight:[""],
          length:[""],
          width:[""],
          height:[""]

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
          this.toggleMargin='0px'
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
          this.toggleMargin='11px'
        }
      });

      this.freightMode = JSON.parse(this.dataStorage.getWelcomeDetails());
      console.log(this.freightMode);

      this.loadCargoType();

      this.listfunc();
  }
  addRow1(){
    let cargoDetailBeanArray = this.docForm.controls.cargoDetailBean as FormArray;
    let arraylen = cargoDetailBeanArray.length;
    let newUsergroup: FormGroup = this.fb.group({
      equipmentType:[""],
      quantity:[""],
      cargoWeight:[""],
      length:[""],
      width:[""],
      height:[""],
    }) 
    cargoDetailBeanArray.insert(arraylen,newUsergroup);
  }
  
  removeRow(index){
    let cargoDetailBeanArray = this.docForm.controls.cargoDetailBean as FormArray;
    cargoDetailBeanArray.removeAt(index);
  
  }
  keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onChange($event: MatSlideToggleChange) {
    if($event.checked == true){
      this.sea = true
    }else{
      this.sea = false
    } 
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
  
        cargoDetailBean:this.fb.array([
          this.fb.group({
            equipmentType:[""],
            quantity:[""],
            cargoWeight:[""]
          })
        ]),
      })
    }
}
