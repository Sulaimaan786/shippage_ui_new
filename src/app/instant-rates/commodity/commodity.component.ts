import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-commodity',
  templateUrl: './commodity.component.html',
  styleUrls: ['./commodity.component.sass']
})
export class CommodityComponent implements OnInit {

  constructor(private fb:FormBuilder,private route: ActivatedRoute,
    private router: Router) {
    control:[""]
   }

  ngOnInit(): void {
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
