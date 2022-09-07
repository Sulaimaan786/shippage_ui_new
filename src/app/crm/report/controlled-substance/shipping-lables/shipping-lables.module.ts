import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import {MatRadioModule} from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShippingLablesRoutingModule } from './shipping-lables-routing.module';
import { AddShippingLablesComponent } from './add-shipping-lables/add-shipping-lables.component';
import { NgxPaginationModule } from 'ngx-pagination'; 


@NgModule({
  declarations: [
    AddShippingLablesComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ShippingLablesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatTableExporterModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
  ]
})
export class ShippingLablesModule { }
