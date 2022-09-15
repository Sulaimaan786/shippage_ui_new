import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesService } from '../instant-rates.service';
import { InstantRatesResultBean } from '../instant-rates-result-bean';
@Component({
  selector: 'app-air-route-details',
  templateUrl: './air-route-details.component.html',
  styleUrls: ['./air-route-details.component.sass']
})
export class AirRouteDetailsComponent implements OnInit {
   dropdownList=[];
  docForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router,  
    private httpService: HttpServiceService,
    private instantRatesService:InstantRatesService,
    private fb: FormBuilder
) {}
  ngOnInit() {


    this.httpService.get<InstantRatesResultBean>(this.instantRatesService.airoriginListUl).subscribe(
      (data) => {
       
        this.dropdownList = data.lInstantRatesBean;
      },
     
    );
    this.docForm = this.fb.group({
  
      totalSecondRow: [""],
      grandTotal: [""],

   
  })
}
  fcl(){
   this.router.navigate(["/instantRates/route-details"]);
  }

  back(){
    this.router.navigate(["instantRates/welcome-page"]);
  }

  air(){
    this.router.navigate(["/authentication/signup"]);
   }
    
}