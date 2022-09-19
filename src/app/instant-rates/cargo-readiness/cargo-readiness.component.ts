import { Component,Renderer2,Inject,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
import {MatDividerHarness} from '@angular/material/divider/testing';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataStorageService } from 'src/app/auth/data-storage';
import * as moment from "moment";
@Component({
  selector: 'app-cargo-readiness',
  templateUrl: './cargo-readiness.component.html',
  styleUrls: ['./cargo-readiness.component.sass']
})
export class CargoReadinessComponent implements OnInit {

  calendar:boolean=false;
  docForm: FormGroup;
  selectedDate: any;
  readiness:any;
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

  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    public dataStorage :DataStorageService,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,) {
     }

  ngOnInit(): void {
    this.docForm = this.fb.group({
      readiness:[""],
      selectedDate:[""]
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
    this.docForm.patchValue({selectedDate:moment(event).format('DD/MM/YYYY')});
    console.log(this.docForm.value);
  }

  
  
incoterms(){
  this.router.navigate(["/instantRates/incoterms"]);
}

commodity(){
  this.router.navigate(["instantRates/commodity"]);
}


cargoReadiness(){
  this.router.navigate(["instantRates/cargoReadiness"]);
}

loadType(){
  this.router.navigate(["instantRates/loadType"]);
  this.dataStorage.setReadinessDetails(JSON.stringify(this.docForm.value));
  console.log("Form Value", this.docForm.value);
}

}
