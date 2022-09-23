import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import { ShipmentModeComponent } from './shipment-mode/shipment-mode.component';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { AirRouteDetailsComponent } from './air-route-details/air-route-details.component';
import { OriginDestinationComponent } from './origin-destination/origin-destination.component';
import { IncotermsComponent } from './incoterms/incoterms.component';
import { RatesComponent } from './rates/rates.component';
import { BookingShipmentComponent } from './booking-shipment/booking-shipment.component';
import { RateSummaryComponent } from './rate-summary/rate-summary.component';
import { BookingComponent } from './booking/booking.component';

import { CommodityComponent } from './commodity/commodity.component';
import { CargoReadinessComponent } from './cargo-readiness/cargo-readiness.component';
import { LoadTypeComponent } from './load-type/load-type.component';
import { CargoDetailsComponent } from './cargo-details/cargo-details.component';
import { RateEditComponent } from './rate-edit/rate-edit.component';
 
const routes: Routes = [
  {
    path: "welcome-page",
    component: WelcomePageComponent,
  },
  {
    path: "shipment-mode",
    component: ShipmentModeComponent,
  },
  {
    path: "route-details",
    component: RouteDetailsComponent,
  },
  {
    path: "air-route",
    component: AirRouteDetailsComponent,
  },
  {
    path: "originDestination",
    component: OriginDestinationComponent,
  },
  {
    path: "incoterms",
    component: IncotermsComponent,
  },
  {
    path: "rates",
    component: RatesComponent,
  },
  {
    path: "bookingShipment",
    component: BookingShipmentComponent,
  },
  {
    path: "rateSummary",
    component: RateSummaryComponent,
   
  },
  {
    path: "booking/:id",
    component:BookingComponent
  },
    {path: "commodity",
    component: CommodityComponent,
  },
  {
    path: "cargoReadiness",
    component: CargoReadinessComponent,
  },
  {
    path: "loadType",
    component: LoadTypeComponent,
  },
  {
    path: "cargoDetails",
    component: CargoDetailsComponent,
  },
  {
    path: "rate-edit",
    component: RateEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
   ReactiveFormsModule,
   MatTableModule,
   MatPaginatorModule,
   MatFormFieldModule,
   MatInputModule,
   MatSnackBarModule,
   MatButtonModule,
   MatIconModule,
   MatDialogModule,
   MatSortModule,
   MatMenuModule,
   MatToolbarModule,
   MatSelectModule,
   MatDatepickerModule,
   MatTabsModule,
   MatCheckboxModule,
   MatTableExporterModule,
   MatTooltipModule,
   MatProgressSpinnerModule,
   ComponentsModule,
   MatButtonModule,
   SharedModule,],
  exports: [RouterModule]
})
export class InstantRatesRoutingModule { }
