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

  calendar:boolean=true;
  docForm:FormGroup;
  readyToMove:any;
  selectedDate:Date;

  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    private router: Router,public dataStorage:DataStorageService) {
    }

  ngOnInit(): void {
     
    this.docForm = this.fb.group({
      readyToMove: [""],
      selectedDate: [""],
    });
  }
  radioClick(value:any){
    if(value==='Yes'){
    this.calendar=true;
    }
    
  }
  onSelect(event){
    console.log(event);
    this.selectedDate= event;
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
  this.dataStorage.setReadinessDetails(JSON.stringify(this.docForm.value));
  console.log(this.docForm.value);
  this.router.navigate(["instantRates/loadType"]);

}

}
