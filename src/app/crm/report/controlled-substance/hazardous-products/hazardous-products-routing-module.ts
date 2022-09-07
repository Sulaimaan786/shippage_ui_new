import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HazardousProductsComponent } from './hazardous-products/hazardous-products.component';

const routes: Routes = [
  {
    path:'addHazardousProduct',
    component: HazardousProductsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HazardousProductsRoutingModule { }
