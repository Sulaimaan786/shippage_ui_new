import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { request } from 'http';
import { RequestQuoteComponent } from './request-quote/request-quote.component';

const routes: Routes = [
  {
  path:"request-quote",
  component:RequestQuoteComponent,
}
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
