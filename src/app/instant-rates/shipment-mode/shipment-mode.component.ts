import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
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
 
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,) {}
  ngOnInit() {
    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        this.mobilepadding = '45px 75px 15px 75px';
        this.webpadding = '75px 75px 75px 75px';
        this.topback = false;
 
        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
          this.padding = this.mobilepadding;
          this.topback = true;
         }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
          this.padding = this.webpadding;
          this.topback = false;
         }
      });
  }
  fcl(){
   this.router.navigate(["/instantRates/route-details"]);
  }

  back(){
    this.router.navigate(["instantRates/welcome-page"]);
  }

  lcl(){
    this.router.navigate(["/authentication/signup"]);
   }
    
}