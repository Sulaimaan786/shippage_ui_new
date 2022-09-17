import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { DataStorageService } from 'src/app/auth/data-storage';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.sass']
})
export class WelcomePageComponent implements OnInit {
  padding : any;
  webpadding: any;
  mobilepadding: any;
  mobileHeading:any;
  innerHeight:any;
  constructor(
    @Inject(DOCUMENT) private document: Document,public dataStorage:DataStorageService,
    private route: ActivatedRoute,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,) {}
  ngOnInit() {
   
    this.responsive.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.mobilepadding = '35px 65px 0px';
        this.webpadding = '78px';
        this.mobileHeading = false;
        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")  
          this.padding = this.mobilepadding;
          this.mobileHeading = true;
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block") 
          this.padding = this.webpadding;
          this.mobileHeading = false;
        }
      });
  }
 
  ocean(value:any){
   this.router.navigate(["/instantRates/shipment-mode"]);
   this.dataStorage.setWelcomeDetails(JSON.stringify(value));
   console.log(value);
  }

  air(value:any){
    this.router.navigate(["/instantRates/air-route"]);
    this.dataStorage.setWelcomeDetails(JSON.stringify(value));
    console.log(value);
   }
    
}
