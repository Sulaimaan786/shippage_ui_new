import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceReturnComponent } from './invoice-return/invoice-return.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path:"addInvoice",
    component: InvoiceComponent
  },
  {
    path:"invoiceReturn/:id/:id2",
    component: InvoiceReturnComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
