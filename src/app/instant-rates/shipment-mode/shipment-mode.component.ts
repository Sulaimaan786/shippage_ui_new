import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-shipment-mode',
  templateUrl: './shipment-mode.component.html',
  styleUrls: ['./shipment-mode.component.sass']
})
export class ShipmentModeComponent implements OnInit {

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

  lcl(){
    this.router.navigate(["/authentication/signup"]);
   }
    
}