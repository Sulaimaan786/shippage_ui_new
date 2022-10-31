import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesService } from '../instant-rates.service';
import { InstantRatesResultBean } from '../instant-rates-result-bean';
import { DataStorageService } from 'src/app/auth/data-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
@Component({
  selector: 'app-air-route-details',
  templateUrl: './air-route-details.component.html',
  styleUrls: ['./air-route-details.component.scss']
})
export class AirRouteDetailsComponent implements OnInit {
  polList=[];
  podList=[];
  
  routeDetails :any;
  padding : any;
  webpadding: any;
  mobilepadding: any;
  hideship:any;
  topback:any;
  nextbutton:any;
  nxtbuttonright:any;
  nxtbuttonBot:any;
  cardBottom:any;
  marBottom:any;
  margTop:any;
  origin:any;
  destination:any;
  
   center:any;
   dropdownList=[];
  docForm: FormGroup;
  document: any;
  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,
    private router: Router,  public dataStorage :DataStorageService,
    private httpService: HttpServiceService, private renderer: Renderer2,
    private instantRatesService:InstantRatesService,private responsive: BreakpointObserver,
    private fb: FormBuilder
) {
   this.docForm = this.fb.group({
    origin: [""],
    destination: [""],
  });
}
  ngOnInit() {

    this.docForm = this.fb.group({
      control:[""],
      origin:[""],
      destination:[""], 

    })

    // refresh
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    //Route Details  
    this.routeDetails =JSON.parse(this.dataStorage.getrouteDetails());
    
    if(this.routeDetails == null){
      this.listfunction();
    }else{
      this.listfunction();
      this.docForm.patchValue({
        'origin':  this.routeDetails.origin,
       })
       this.docForm.patchValue({
        'destination':  this.routeDetails.destination,
       })
    }



    this.httpService.get<InstantRatesResultBean>(this.instantRatesService.airoriginListUl).subscribe(
      (data) => {
       
        this.dropdownList = data.lInstantRatesBean;
      },
     
    );
    
  this.responsive.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.mobilepadding = '45px 75px 15px 75px';
        this.webpadding = '75px 75px 75px 75px';
        this.hideship = false;
        this.topback = false;
        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")  
          this.padding = this.mobilepadding;
          this.hideship = false;
          this.topback = true;
          this.nextbutton = '25%';
          this.nxtbuttonright = '28%';
          this.nxtbuttonBot = '3%';
          this.cardBottom = '75px';
          this.margTop='20%';
          
         
         
          this.topback = true; 
          this.center = true;
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block") 
          this.padding = this.webpadding;
          this.hideship = true;
          this.topback = false;
          this.nextbutton = '15px';
          this.nxtbuttonright = '2%';
          this.nxtbuttonBot = '1%';
          this.cardBottom = '15px';
          this.margTop='0';
          
          
          
          this.topback = false; 
          this.center = false;
        }
      });
}
listfunction(){

  this.httpService.get<InstantRatesResultBean>(this.instantRatesService.originListUl).subscribe(
    (data) => {
     
      this.polList = data.lInstantRatesBean;
      this.podList = data.podlist;
    }, 
 );
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

  
  proceed(){
    if (this.docForm.valid) {
    this.dataStorage.saverouteDetails(JSON.stringify(this.docForm.value)); 
     this.router.navigate(["instantRates/incoterms"]);
    console.log("Form Value", this.docForm.value);
    }
    else
  {
    this.showNotification(
      "snackbar-danger",
      "Please fill all the required details!",
      "top",
      "right");
  }
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
    
}