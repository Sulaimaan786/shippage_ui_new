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
  values :any;
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
      this.values =JSON.parse(this.dataStorage.getrouteDetails());
      console.log("datas" +this.values.destination);
  }

  rateSummary(){
    this.router.navigate(["instantRates/rateSummary"]);
  }
 


}


