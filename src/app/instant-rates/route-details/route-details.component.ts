import { Component, OnInit ,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { FormBuilder, FormGroup } from '@angular/forms';
 import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesResultBean } from '../instant-rates-result-bean';
import { InstantRatesService } from '../instant-rates.service';
import { DataStorageService } from 'src/app/auth/data-storage';


@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.sass']
})
export class RouteDetailsComponent implements OnInit {
  
  dropdownList=[];
  docForm: FormGroup;
  routeDetails =[];
  padding : any;
  webpadding: any;
  mobilepadding: any;

  constructor(private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,public dataStorage :DataStorageService,
    private router: Router,private httpService: HttpServiceService,
    private instantRatesService:InstantRatesService,
    private fb: FormBuilder,private responsive: BreakpointObserver,
    private renderer: Renderer2
    ) {
      this.docForm = this.fb.group({
        origin: [""],
        destination: [""],
      });
    } 
 
  ngOnInit() { 
    this.httpService.get<InstantRatesResultBean>(this.instantRatesService.originListUl).subscribe(
      (data) => {
       
        this.dropdownList = data.lInstantRatesBean;
      },

   );


    this.responsive.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.mobilepadding = '45px 75px 15px 75px';
        this.webpadding = '75px 75px 75px 75px';
        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")  
          this.padding = this.mobilepadding;
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block") 
          this.padding = this.webpadding;
        }
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
    this.routeDetails.push(this.docForm)
    this.dataStorage.saverouteDetails(JSON.stringify(this.docForm.value));
    console.log("Form Value", this.docForm.value);
  }
    
}
