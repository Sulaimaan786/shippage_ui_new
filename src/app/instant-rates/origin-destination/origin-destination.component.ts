import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-origin-destination',
  templateUrl: './origin-destination.component.html',
  styleUrls: ['./origin-destination.component.sass']
})
export class OriginDestinationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,) {}
  ngOnInit() {
   
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
