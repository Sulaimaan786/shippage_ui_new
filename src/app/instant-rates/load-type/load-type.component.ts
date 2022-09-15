import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-load-type',
  templateUrl: './load-type.component.html',
  styleUrls: ['./load-type.component.sass']
})
export class LoadTypeComponent implements OnInit {
  docForm: FormGroup;
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
    

    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
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
  }
}
