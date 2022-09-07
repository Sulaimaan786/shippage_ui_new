import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.sass']
})
export class RouteDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,) {}
  ngOnInit() {
   
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
    
}
