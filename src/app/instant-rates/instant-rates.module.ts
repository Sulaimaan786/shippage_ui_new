import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { NgApexchartsModule } from "ng-apexcharts";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSortModule } from "@angular/material/sort";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from "@angular/material/menu";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatRadioModule } from "@angular/material/radio";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { InstantRatesRoutingModule } from './instant-rates-routing.module';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ShipmentModeComponent } from './shipment-mode/shipment-mode.component';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { AirRouteDetailsComponent } from './air-route-details/air-route-details.component';
import { OriginDestinationComponent } from './origin-destination/origin-destination.component';
import { IncotermsComponent } from './incoterms/incoterms.component';
import { RatesComponent } from './rates/rates.component';
import { BookingShipmentComponent } from './booking-shipment/booking-shipment.component';
import { RateSummaryComponent } from './rate-summary/rate-summary.component';

import { BookingComponent } from './booking/booking.component';
// import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    WelcomePageComponent,
    ShipmentModeComponent,
    RouteDetailsComponent,
    AirRouteDetailsComponent,
    OriginDestinationComponent,
    IncotermsComponent,
    RatesComponent,
    BookingShipmentComponent,
    RateSummaryComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    InstantRatesRoutingModule,
      chartjsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    NgApexchartsModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSortModule,
    MatTabsModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatRadioModule,
    DragDropModule,
    MatProgressSpinnerModule,
    // FlexLayoutModule,
  ]
})
export class InstantRatesModule { }
