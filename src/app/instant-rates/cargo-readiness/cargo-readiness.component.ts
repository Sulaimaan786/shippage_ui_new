import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-cargo-readiness',
  templateUrl: './cargo-readiness.component.html',
  styleUrls: ['./cargo-readiness.component.sass']
})
export class CargoReadinessComponent implements OnInit {

  calendar:boolean=true;

  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
  }
  radioClick(value:any){
    if(value==='Yes'){
    this.calendar=true;
    }
    
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

}
