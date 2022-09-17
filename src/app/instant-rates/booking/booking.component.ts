import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.sass']
})
export class BookingComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,) {}
  ngOnInit() {
   
  }


  back(){
    this.router.navigate(["instantRates/rates"]);
  }

  bookingShipment(){
    this.router.navigate(["instantRates/rateSummary"]);
  }


}