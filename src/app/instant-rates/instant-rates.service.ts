import { Injectable } from '@angular/core';
import { serverLocations } from '../auth/serverLocations';
import { InstantRates } from './instant-rates.model';
import { HttpServiceService } from 'src/app/auth/http-service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class InstantRatesService {
  dialogData: any;
  constructor(
    private serverUrl: serverLocations, private httpService: HttpServiceService
  ) { }
 
  public originListUl = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getpolList`;

  public airoriginListUl = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getairpolList`;

  public commoditylist = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/commoditylist`;

  public incoterms = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getincotermsList`;

  public origin = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/origin`;

  public destination = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/destination`;

  public incoterm = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/incoterm`;

  public equipName = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getequipName`;

  public getrateslist = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getrateslist`;

  public equipmentTypeList  = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getequipmentType`;

  public getratesUniquelist = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getUniqueRateslist`;
  
  public commodity = `${this.serverUrl.apiServerAddress}api/auth/app/instantrates/getCommodityName`;
  // This is for save
  // addPurchaseInvoice(instantRates: InstantRates): void {
  //   this.dialogData = instantRates;
  //   this.httpService.post<InstantRates>(this.getrateslist, instantRates).subscribe(data => {
  //     console.log(data);
  //     },
  //     (err: HttpErrorResponse) => {
  //   });
  // }
  
}
