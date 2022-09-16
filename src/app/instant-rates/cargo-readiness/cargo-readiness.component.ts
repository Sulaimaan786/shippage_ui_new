import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DataStorageService } from 'src/app/auth/data-storage';

@Component({
  selector: 'app-cargo-readiness',
  templateUrl: './cargo-readiness.component.html',
  styleUrls: ['./cargo-readiness.component.sass']
})
export class CargoReadinessComponent implements OnInit {

  calendar:boolean=false;
  docForm: FormGroup;
  readiness: any;

  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    public dataStorage :DataStorageService,
    private router: Router) {
      this.docForm = this.fb.group({
        readiness:[""],
        
     })
  
  
     }

  ngOnInit(): void {
    
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
    this.readiness = event;
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
