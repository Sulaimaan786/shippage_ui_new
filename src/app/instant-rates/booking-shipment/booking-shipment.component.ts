import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesService } from '../instant-rates.service';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LandscapeLoaderComponent } from '../landscape-loader/landscape-loader.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-booking-shipment',
  templateUrl: './booking-shipment.component.html',
  styleUrls: ['./booking-shipment.component.sass']
})
export class BookingShipmentComponent implements OnInit {

  bookingNo:any;
  private unsubscriber : Subject<void> = new Subject<void>();
  constructor(
    @Inject(DOCUMENT) private document: Document,public dialog:MatDialog,
    private route: ActivatedRoute,private httpService: HttpServiceService,
    private router: Router,private responsive: BreakpointObserver,
    private renderer: Renderer2,private instantRatesService:InstantRatesService,) {}
  ngOnInit() {

    history.pushState(null, '');

    fromEvent(window, 'popstate').pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((_) => {
      history.pushState(null, '');
     });

    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block")
        }
      });

      // tablet view
      this.responsive.observe([Breakpoints.Tablet]).subscribe(result =>{
        if (result.matches) { 
        const viewport = screen.orientation.type;
         if(viewport == "portrait-primary"){
          this.tabview()
          } 
        }
      });

      this.httpService.get(this.instantRatesService.getBookingNo).subscribe((res: any) => {
        this.bookingNo = res.bookingNo;
        });
  }
  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  tabview(){ 
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";  
    }
    const dialogRef = this.dialog.open(LandscapeLoaderComponent, {
      height: "100%",
      width: "100%",
       direction: tempDirection,
    });  
  }
}
