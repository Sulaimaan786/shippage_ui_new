import { Component, OnInit,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { DataStorageService } from 'src/app/auth/data-storage';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LandscapeLoaderComponent } from '../landscape-loader/landscape-loader.component';
import { MatDialog } from '@angular/material/dialog';
//import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.sass']
})
export class WelcomePageComponent implements OnInit {
  padding : any;
  webpadding: any;
  mobilepadding: any;
  mobileHeading:any;
  innerHeight:any;
  cardBottom:any;
  private unsubscriber : Subject<void> = new Subject<void>();
  constructor(
    @Inject(DOCUMENT) private document: Document,public dataStorage:DataStorageService,
    private route: ActivatedRoute,
    private router: Router,private responsive: BreakpointObserver,public dialog: MatDialog,
    private renderer: Renderer2, ) {}
  ngOnInit() {

    history.pushState(null, '');

    fromEvent(window, 'popstate').pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((_) => {
      history.pushState(null, '');
      });
   
    this.responsive.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.mobilepadding = '35px 75px 0px';
        this.webpadding = '78px';
        this.mobileHeading = false;
        
        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")  
          this.padding = this.mobilepadding;
          this.mobileHeading = true;
          this.cardBottom = '74px' 
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block") 
          this.padding = this.webpadding;
          this.mobileHeading = false;
          this.cardBottom = '24px'
        }
      });
      this.responsive.observe([Breakpoints.Tablet]).subscribe(result =>{
        if (result.matches) { 
        const viewport = screen.orientation.type;
        console.log(viewport)
        if(viewport == "portrait-primary"){
          this.tabview()
          }else{
            this.padding = '70px 45px'
          }
        }
      });

      switch (screen.orientation.type) {
        case "landscape-primary":
          console.log("That looks good.");
          break;
        case "landscape-secondary":
          console.log("Mmmh… the screen is upside down!");
          break;
        case "portrait-secondary":
        case "portrait-primary":
          console.log("Mmmh… you should rotate your device to landscape");
          break;
        default:
          console.log("The orientation API isn't supported in this browser :(");
      }
  }
 
  ocean(value:any){
   this.router.navigate(["/instantRates/shipment-mode"]);
   this.dataStorage.setWelcomeDetails(JSON.stringify(value));
   console.log(value);
  }

  air(value:any){
    this.router.navigate(["/instantRates/air-route"]);
    this.dataStorage.setWelcomeDetails(JSON.stringify(value));
    console.log(value);
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
