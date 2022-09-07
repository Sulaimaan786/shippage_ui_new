import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { InvoiceForm } from './invoice-models';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends UnsubscribeOnDestroyAdapter{

  isTblLoading = true;
  dataChange: BehaviorSubject<InvoiceForm[]> = new BehaviorSubject<InvoiceForm[]>(
    []
  );
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient,private serverUrl:serverLocations,private httpService:HttpServiceService) {
    super();
  }

  public getInvoiceList = `${this.serverUrl.apiServerAddress}api/auth/app/report/getInvoiceLists`;
  public openReceipt = `${this.serverUrl.apiServerAddress}api/auth/app/report/getOpenReceipt`;
  public getInvoiceGet= `${this.serverUrl.apiServerAddress}api/auth/app/report/getInvoiceGetList`;
  public saveInvoiceValue = `${this.serverUrl.apiServerAddress}api/auth/app/report/saveInvoiceValues`;
  public manufacturerCode = `${this.serverUrl.apiServerAddress}api/auth/app/report/getManufacturerCode`;
  public updateInvoiceValue = `${this.serverUrl.apiServerAddress}api/auth/app/report/updateInvoiceValues`;
  


  get data(): InvoiceForm[] {
    return this.dataChange.value;
  }
 


}