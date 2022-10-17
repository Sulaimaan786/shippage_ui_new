import { Component } from "@angular/core";
import { Event, Router, NavigationStart, NavigationEnd } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { PlatformLocation } from "@angular/common";
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
  
})
export class AppComponent {
  currentUrl: string;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  constructor(
    public _router: Router,
    location: PlatformLocation,
    private spinner: NgxSpinnerService,
    private idle: Idle, private keepalive: Keepalive
  ) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.spinner.show();
        // location.onPopState(() => {
        //   window.location.reload();
        // });
        this.currentUrl = routerEvent.url.substring(
          routerEvent.url.lastIndexOf("/") + 1
        );
      }
      if (routerEvent instanceof NavigationEnd) {
        this.spinner.hide();
      }
      window.scrollTo(0, 0);
    });


     // sets an idle timeout of 15 mins.
     idle.setIdle(900);
     // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
     idle.setTimeout(10);
     // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
     idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
 
     idle.onIdleEnd.subscribe(() => { 
      // this.idleState = 'No longer idle.'
       console.log(this.idleState);
       this.reset();
     });
     
     idle.onTimeout.subscribe(() => {
       this.idleState = 'Timed out!';
       this.timedOut = true;
       console.log(this.idleState);
       this._router.navigate(['/']);
     });
     
     idle.onIdleStart.subscribe(() => {
        // this.idleState = 'You\'ve gone idle!'
         console.log(this.idleState);
         //this.childModal.show();
     });
     
     idle.onTimeoutWarning.subscribe((countdown) => {
       this.idleState = 'You will time out in ' + countdown + ' seconds!'
      // console.log(this.idleState);
     });
 
     // sets the ping interval to 15 seconds
     keepalive.interval(15);
 
     keepalive.onPing.subscribe(() => this.lastPing = new Date());
 
     this.reset();
   }
 
   reset() {
     this.idle.watch();
     this.idleState = 'Started.';
     this.timedOut = false;
   }

  }


  

