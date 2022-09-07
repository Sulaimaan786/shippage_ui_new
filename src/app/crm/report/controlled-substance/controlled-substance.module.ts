import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlledSubstanceRoutingModule } from './controlled-substance-routing.module';
import { InvoiceComponent } from './Invoice/invoice/invoice.component';


@NgModule({
  declarations: [
    
  
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    ControlledSubstanceRoutingModule
  ]
})
export class ControlledSubstanceModule { }
