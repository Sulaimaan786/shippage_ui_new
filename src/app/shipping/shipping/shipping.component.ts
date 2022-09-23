import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/auth/data-storage';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { ShippingService } from '../shipping.service';
import { ShippingResultBean } from '../shipping-result-bean';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.sass']
})
export class ShippingComponent implements OnInit {
  refIdDropdownList=[];
  docForm: FormGroup;
  
  events:any[];

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
    this.events = [
      {content:'Ordered',  status:'R'},
      {content:'Processing', status:'R'},
      {content:'Shipped'},
      {content:'Delivered'}
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

   
  }

}
