import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
 import { DataStorageService } from 'src/app/auth/data-storage';
@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.sass']
})
export class RatesComponent implements OnInit {
  routeDetails :any;
  cargoReady:any;
  loadtype:any;
  loadDetails:any;
  incotermsValue:any;
  commodityValues:any 
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,public dataStorage :DataStorageService,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,) {}
  ngOnInit() {
    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
        }
      }); 
      this.routeDetails =JSON.parse(this.dataStorage.getrouteDetails());
      console.log("route " +this.routeDetails.destination);

      this.incotermsValue =JSON.parse(this.dataStorage.getIncotermsDetails());
      console.log("datas" +this.incotermsValue.incoterms);

      this.commodityValues =JSON.parse(this.dataStorage.getCommodityDetails());
      console.log("datas" +this.commodityValues.commodity);

      this.cargoReady = JSON.parse(this.dataStorage.getReadinessDetails());
      console.log("ready  " +this.cargoReady.date);

      this.loadtype = this.dataStorage.getLoadDetails();
      this.loadDetails = JSON.parse(this.loadtype)
      console.log("load  " +this.loadDetails.loadTypeDetailBean[0].equipmentType);

  }

  rateSummary(){
    this.router.navigate(["instantRates/rateSummary"]);
  }
 


}


