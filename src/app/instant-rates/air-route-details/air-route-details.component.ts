import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-air-route-details',
  templateUrl: './air-route-details.component.html',
  styleUrls: ['./air-route-details.component.sass']
})
export class AirRouteDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,) {}
  ngOnInit() {
   
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
