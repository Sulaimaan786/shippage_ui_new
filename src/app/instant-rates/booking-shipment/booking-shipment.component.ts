import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesService } from '../instant-rates.service';


@Component({
  selector: 'app-booking-shipment',
  templateUrl: './booking-shipment.component.html',
  styleUrls: ['./booking-shipment.component.sass']
})
export class BookingShipmentComponent implements OnInit {

  bookingNo:any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,private httpService: HttpServiceService,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,private instantRatesService:InstantRatesService,) {}
  ngOnInit() {
    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
        }
      });

      this.httpService.get(this.instantRatesService.getBookingNo).subscribe((res: any) => {
        this.bookingNo = res.bookingNo;
        });
  }

}
