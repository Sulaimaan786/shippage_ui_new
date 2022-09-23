import { Component, OnInit ,Renderer2,Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { element } from 'protractor';
import { DOCUMENT } from "@angular/common";
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesResultBean } from '../instant-rates-result-bean';
import { InstantRatesService } from '../instant-rates.service';
import { DataStorageService } from 'src/app/auth/data-storage';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss']
})
export class RouteDetailsComponent implements OnInit {


  
  dropdownList=[];
  docForm: FormGroup;
  routeDetails =[];
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
  
   center:any;
 
  constructor(private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,public dataStorage :DataStorageService,
    private router: Router,private httpService: HttpServiceService,
    private snackBar: MatSnackBar,
    private instantRatesService:InstantRatesService,
    private fb: FormBuilder,private responsive: BreakpointObserver,
    private renderer: Renderer2
    ) {
      this.docForm = this.fb.group({
        origin: [""],
        destination: [""],
      });
    } 
 
  ngOnInit() { 
    // refresh
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    // orginList
    this.httpService.get<InstantRatesResultBean>(this.instantRatesService.originListUl).subscribe(
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
  fcl(){
   this.router.navigate(["/instantRates/route-details"]);
  }

  back(){
    this.router.navigate(["instantRates/shipment-mode"]);
  }

  air(){
    this.router.navigate(["/authentication/signup"]);
   }

  proceed(){
    if (this.docForm.valid) {
    this.router.navigate(["instantRates/incoterms"]);
    this.routeDetails.push(this.docForm)
    this.dataStorage.saverouteDetails(JSON.stringify(this.docForm.value));
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
