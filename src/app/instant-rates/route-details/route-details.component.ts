import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesResultBean } from '../instant-rates-result-bean';
import { InstantRatesService } from '../instant-rates.service';


@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.sass']
})
export class RouteDetailsComponent implements OnInit {
  
  dropdownList=[];
  docForm: FormGroup;
  

  constructor(private route: ActivatedRoute,
    private router: Router,private httpService: HttpServiceService,
    private instantRatesService:InstantRatesService,
    private fb: FormBuilder
    ) {} 
  ngOnInit() {

    this.httpService.get<InstantRatesResultBean>(this.instantRatesService.originListUl).subscribe(
      (data) => {
       
        this.dropdownList = data.lInstantRatesBean;
      },
     
    );
    this.docForm = this.fb.group({
  
      totalSecondRow: [""],
      grandTotal: [""],

      
    });
   
  }
  fcl(){
   this.router.navigate(["/instantRates/route-details"]);
  }

  back(){
    this.router.navigate(["instantRates/shipment-mode"]);
  }

  air(){
    this.router.navigate(["/authentication/signup"]);
   }

  proceed(){
    this.router.navigate(["instantRates/incoterms"]);
  }
    
}
