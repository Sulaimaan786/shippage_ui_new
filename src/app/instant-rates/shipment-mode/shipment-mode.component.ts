import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { DataStorageService } from 'src/app/auth/data-storage';
@Component({
  selector: 'app-shipment-mode',
  templateUrl: './shipment-mode.component.html',
  styleUrls: ['./shipment-mode.component.sass']
})
export class ShipmentModeComponent implements OnInit {
  padding : any;
  webpadding: any;
  mobilepadding: any;
  topback:any;
  cardbnner:any;
  cardbnner1:any;
  cardpadding:any;
 
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,public dataStorage: DataStorageService,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,) {}
  ngOnInit() {
    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        this.mobilepadding = '45px 75px 15px';
        this.webpadding = '75px 84px';
        this.cardbnner = '42px 0px 35px 0px';
        this.cardbnner1 = '80px 0px 115px 0px;';
        this.topback = false;
 
        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
           this.padding = this.mobilepadding;
           this.cardpadding = this.cardbnner
          this.topback = true;
         }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
           this.padding = this.webpadding;
           this.cardpadding = this.cardbnner
          this.topback = false;
         }
      });
  }
  fcl(value:any){
   this.router.navigate(["/instantRates/route-details"]);
   this.dataStorage.setShipmentDetails(JSON.stringify(value));
   console.log(value);
  }

  back(){
    this.router.navigate(["instantRates/welcome-page"]);
  }

  lcl(value:any){
    this.router.navigate(["/authentication/signup"]);
    this.dataStorage.setShipmentDetails(JSON.stringify(value));
    console.log(value);   }
    
}