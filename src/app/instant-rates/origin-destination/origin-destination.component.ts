import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
@Component({
  selector: 'app-origin-destination',
  templateUrl: './origin-destination.component.html',
  styleUrls: ['./origin-destination.component.sass']
})
export class OriginDestinationComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
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
  }
  fcl(){
   this.router.navigate(["/instantRates/route-details"]);
  }

  back(){
    this.router.navigate(["instantRates/route-details"]);
  }

  air(){
    this.router.navigate(["/authentication/signup"]);
   }
  incoterms(){
    this.router.navigate(["/instantRates/incoterms"]);
  }

  next(){
    this.router.navigate(["/instantRates/incoterms"]);
  }
    
}
