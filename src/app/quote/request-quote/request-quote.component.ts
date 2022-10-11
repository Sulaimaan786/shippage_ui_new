import { Component, OnInit,Inject,Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver } from "@angular/cdk/layout";
import { Breakpoints } from "@angular/cdk/layout";
import { DOCUMENT } from "@angular/common";
 import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InstantRatesResultBean } from 'src/app/instant-rates/instant-rates-result-bean';
import { InstantRatesService } from 'src/app/instant-rates/instant-rates.service';
import { Quote } from '../request-quote-model';
import { RequestQuoteService } from '../request-quote.service';

@Component({
  selector: 'app-request-quote',
  templateUrl: './request-quote.component.html',
  styleUrls: ['./request-quote.component.sass']
})

export class RequestQuoteComponent implements OnInit {
  docForm: FormGroup;
  dropdownList:[];
  incotermList:[];
  commodity:[];
  quote:Quote;
  cardBottom:any;
  nextbutton:any;
  nxtbuttonright:any;
  nxtbuttonBot:any;
  constructor(private snackBar:MatSnackBar,public router: Router,private instantRatesService:InstantRatesService,private requestQuoteService:RequestQuoteService,
    private httpService: HttpServiceService,private fb: FormBuilder,
    private responsive: BreakpointObserver,private route: ActivatedRoute,
    private renderer: Renderer2, @Inject(DOCUMENT) private document: Document,) { }
 
  ngOnInit(): void {
    this.docForm = this.fb.group({
      // first: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
   //   currencyCode: ["", [Validators.required]],
      name:  ["", [Validators.required]],
      contactNo: [""],
      emailId: ["", [Validators.required]],
      origin:  ["", [Validators.required]],
      destination: ["", [Validators.required]],
      commodity:  ["", [Validators.required]],
      cargoReadiness: ["", [Validators.required]],
      incoterms:  ["", [Validators.required]],
      numberOfUnits: [""],
      length: [""],
      width: [""],
      height: [""],
      unit: [""],
      weight: [""],
      comments: [""], 
    });

    this.responsive.observe(Breakpoints.Handset)
      .subscribe(result => {

        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block") 
          this.cardBottom = '75px'
          this.nextbutton = '15px';
          this.nxtbuttonright = '33%';
          this.nxtbuttonBot = '3%';
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block") 
          this.cardBottom = '24px'
          this.nextbutton = '18px';
          this.nxtbuttonright = '0%';
          this.nxtbuttonBot = '0%';
        }
      });



//origin 
    this.httpService.get<InstantRatesResultBean>(this.instantRatesService.originListUl).subscribe(
      (data) => {
       
        this.dropdownList = data.lInstantRatesBean;
      },

   );
   // incotermList
   this.httpService.get<InstantRatesResultBean>(this.instantRatesService.incoterms).subscribe(
    (data) => {
     
      this.incotermList = data.ltermslist;
    },
   
  );
  this.httpService.get<InstantRatesResultBean>(this.instantRatesService.commoditylist).subscribe(     
      
    (data) => {
      this.commodity =data.commodityl;
    },
  );
  }
  onSubmit() {
    if(this.docForm.valid){
      this.quote = this.docForm.value;
      console.log(this.quote)
      this.requestQuoteService.addQuote(this.quote);
   
      this.showNotification(
        "snackbar-success",
        "Add Record Successfully...!!!",
        "bottom",
        "center"
      );
      this.router.navigate(['/instantRates/welcome-page']);
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
  keyPressNumeric(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
