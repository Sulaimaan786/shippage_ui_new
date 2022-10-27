import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/auth/data-storage';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ShippingService } from '../shipping.service';
import { ShippingResultBean } from '../shipping-result-bean';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.sass']
})
export class ShippingComponent implements OnInit {
  refIdDropdownList=[];
  docForm: FormGroup;
  
  events:any[];
  mobilepadding: any;
  webpadding: any;
  padding: any;
  margLeft:any;
  private unsubscriber : Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,public dataStorage :DataStorageService,
    private router: Router,private httpService: HttpServiceService,
    
    private snackBar: MatSnackBar,
   // private shippingResultBean: ShippingResultBean,
    private shippingService:ShippingService,
    private fb: FormBuilder,private responsive: BreakpointObserver,
    private renderer: Renderer2) {


   }

  ngOnInit(): void {

    history.pushState(null, '');

    fromEvent(window, 'popstate').pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((_) => {
      history.pushState(null, '');
      });


    this.events = [
      {content:'Pick up',  status:'R'},
      {content:'Custom Cleared', status:'R'},
      {content:'ETD'},
      {content:'ETA'},
      {content:'Do Released'},
      {content:'Custom Cleared'},
      {content:'Door Delivered'}
    ]
     // refIdList
     this.docForm = this.fb.group({
      refId: [""],
      
      
    });
     this.httpService.get<ShippingResultBean>(this.shippingService.refIdList).subscribe(
      (data) => {
       
        this.refIdDropdownList = data.refIdList;
      },

   );

   this.responsive.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.mobilepadding = '45px 75px 15px 75px';
        this.webpadding = '75px 75px 75px 75px';
        
        if (result.matches) {  
          this.renderer.addClass(this.document.body,"content-block")  
          this.padding = this.mobilepadding;
          this.margLeft = '25%';
          
        }else{ 
          this.renderer.removeClass(this.document.body,"content-block") 
          this.padding = this.webpadding;
          this.margLeft = '80%';
         
        }
      });

   
  }

}
