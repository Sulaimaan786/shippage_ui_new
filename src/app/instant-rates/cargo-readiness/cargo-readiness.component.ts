import { Component,Renderer2,Inject,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import {MatDividerHarness} from '@angular/material/divider/testing';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataStorageService } from 'src/app/auth/data-storage';
import * as moment from "moment";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AnyTxtRecord } from 'dns';
@Component({
  selector: 'app-cargo-readiness',
  templateUrl: './cargo-readiness.component.html',
  styleUrls: ['./cargo-readiness.component.sass']
})
export class CargoReadinessComponent implements OnInit {

  calendar:boolean=false;
  docForm: FormGroup;
  selectedDate: any;
  
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
  submitted:boolean=false;
  currentDate:string;
  cargoReady:any;
  dateformat:any;
  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    public dataStorage :DataStorageService,
    private router: Router,private responsive: BreakpointObserver,
    private snackBar: MatSnackBar,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,) {
     }

  ngOnInit(): void {
    this.docForm = this.fb.group({
     
      selectedDate:["", [Validators.required]]
   })

   this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

      if (result.matches) {  
        this.renderer.addClass(this.document.body,"content-block")
          this.cardpadding ='2px 8px 0px 8px';
        this.padleft = '55px';
        this.butTopmar = '20px';
        this.firstbutton = '20px'
        this.butLeftmar = '85px';
        this.height = '90%';
        this.nextbutton = '110px';
        this.nxtbuttonright = '28%';
        this.nxtbuttonBot = '3%';
        this.topback = true;
        this.buttonwidth = '160px';
        this.cardBottom = '68px'
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
           this.cardpadding ='0px 50px 0px 20px';
          this.padleft = '80px';
          this.butTopmar = '20px';
          this.firstbutton = '150px'
          this.butLeftmar = '30px';
          this.height = '80%'
          this.nextbutton = '33px';
         this.nxtbuttonright = '2%';
         this.nxtbuttonBot = '1%';
          this.topback = false;
          this.cardBottom = '24px'
          
        }
      });

      this.currentDate = new Date().toISOString().substr(0, 16);


      this.cargoReady = JSON.parse(this.dataStorage.getReadinessDetails());
      this.dateformat = this.cargoReady.selectedDate;
      this.dateformat.toString();
      this.docForm.patchValue({
        selectedDate:moment(this.cargoReady.selectedDate).format('YYYY-MM-DDTHH:mm:ssZ')
       }) 
      this.docForm.patchValue({
        'selectedDate':  this.cargoReady.selectedDate,
       })

       if(this.cargoReady.selectedDate != 'Ready'){
        this.calendar=true;
       }
  }

  radioClick(value:any){
    if(value=='Yes'){
    this.calendar=true;
    }
    else if(value==='No')
    {
      this.calendar=false; 
    }
    
  }



  onSelect(event){
    console.log(event);
    this.selectedDate= event;
    this.selectedDate.toString()
    // this.docForm.patchValue({selectedDate:moment(event).format('DD/MM/YYYY')});
    this.docForm.patchValue({selectedDate:moment(event).format('DD MMM y')});
    console.log(this.docForm.value);
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

showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, "", {
    duration: 2000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}
loadType(){
  // this.submitted=true;
   if (this.docForm.valid) {
  this.router.navigate(["instantRates/loadType"]);
  this.dataStorage.setReadinessDetails(JSON.stringify(this.docForm.value));
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

}
