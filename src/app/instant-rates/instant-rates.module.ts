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
import { MatTabsModule } from "@angular/material/tabs";
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
import { CommodityComponent } from './commodity/commodity.component';
import { CargoReadinessComponent } from './cargo-readiness/cargo-readiness.component';
import { LoadTypeComponent } from './load-type/load-type.component';
import { CargoDetailsComponent } from './cargo-details/cargo-details.component';

import { BookingComponent } from './booking/booking.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RateEditComponent } from './rate-edit/rate-edit.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
//import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SignupComponent } from './signup/signup.component';

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
    BookingComponent,
    CommodityComponent,
    CargoReadinessComponent,
    LoadTypeComponent,
    CargoDetailsComponent,
    RateEditComponent,
    SignupComponent
  ],
  providers: [
    EncrDecrService,
    EncryptionService
  ],
  imports: [
    CommonModule,
    InstantRatesRoutingModule,
      chartjsModule,
    FormsModule,
   // MatAutocomplete,
   MatAutocompleteModule,
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
    MatButtonToggleModule,
   
    
    
    // FlexLayoutModule,
    NgMultiSelectDropDownModule.forRoot()

  ]
})
export class InstantRatesModule { }
