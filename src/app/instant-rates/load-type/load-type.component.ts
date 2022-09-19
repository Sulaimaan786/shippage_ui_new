import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataStorageService } from 'src/app/auth/data-storage';

@Component({
  selector: 'app-load-type',
  templateUrl: './load-type.component.html',
  styleUrls: ['./load-type.component.scss']
})
export class LoadTypeComponent implements OnInit {
  docForm: FormGroup;
  loadTypeDetailBean:[];
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


  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,public dataStorage :DataStorageService,
    @Inject(DOCUMENT) private document: Document,) { 
    this.docForm = this.fb.group({
      control:[""],

      loadTypeDetailBean:this.fb.array([
        this.fb.group({
          equipmentType:[""],
          quantity:[""],
          cargoWeight:[""]
        })
      ]),

      // cargoDetailBean:this.fb.array([
      //   this.fb.group({
      //     equipmentType:[""],
      //     quantity:[""],
      //     cargoWeight:[""]
      //   })
      // ])
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
          this.cardBottom = '65px'
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
          this.cardpadding ='0px 50px 0px 20px';
          this.padleft = '80px';
          this.butTopmar = '20px';
          this.firstbutton = '150px'
          this.butLeftmar = '30px';
          this.height = '80%'
          this.nextbutton = '95px';
          this.buttonwidth = '120px';
         this.nxtbuttonright = '2%';
         this.nxtbuttonBot = '1%';
          this.topback = false;
          this.cardBottom = '0px'
        }
      });
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
  this.router.navigate(["instantRates/commodity"]);
}


cargoReadiness(){
  this.router.navigate(["instantRates/cargoReadiness"]);
}

loadType(){
  this.router.navigate(["instantRates/loadType"]);
}

  rates(){
    this.router.navigate(["instantRates/rates"]);
    this.dataStorage.setLoadDetails(JSON.stringify(this.docForm.value));
    console.log(this.docForm.value);
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
}
