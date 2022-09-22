import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRoutingModule } from './quote-routing.module';
import { RequestQuoteComponent } from './request-quote/request-quote.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 

@NgModule({
  declarations: [
    RequestQuoteComponent
  ],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonToggleModule
  ]
})
export class QuoteModule { }
