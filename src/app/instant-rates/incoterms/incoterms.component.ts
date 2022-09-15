import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-incoterms',
  templateUrl: './incoterms.component.html',
  styleUrls: ['./incoterms.component.sass']
})
export class IncotermsComponent implements OnInit {
  
  docForm: FormGroup;
  incotermsChange:boolean=false;
  commodityChange:boolean=false;
  cargoReadinessChange:boolean=false;
  calendar:boolean=true;
  loadTypeChange:boolean=false;
  cargoDetailsChange=false;
  loadTypeDetailBean:[];


  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,
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
    this.incotermsChange=true;

    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
        }
      });
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
  this.router.navigate(["instantRates/commodity"]);
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
